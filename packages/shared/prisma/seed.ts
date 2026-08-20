import "dotenv/config";
import {Pool} from "pg";
import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "../src/db";
import {faker} from '@faker-js/faker'
import bcrypt from "bcrypt";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({connectionString});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter});

const NUM_USERS = {min: 10, max: 40};
const NUM_TAGS = {min: 15, max: 30};
const POSTS_PER_USER = {min: 0, max: 6};
const TAGS_PER_POST = {min: 1, max: 4};
const COMMENTS_PER_POST = {min: 0, max: 10};
const REPLY_CHANCE = 0.35;
const VOTE_CHANCE = 0.5;
const UPVOTE_CHANCE = 0.75;

const clearDatabase = async () => {
    console.log("Clearing existing data...");
    await prisma.vote.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.user.deleteMany();
}

const seedUsers = async () => {
    const numUsers = faker.number.int(NUM_USERS);
    console.log(`Seeding ${numUsers} users...`);
    const users = [];
    const usedUsernames = new Set<string>();

    while (users.length < numUsers) {
        const username = faker.internet.username().toLowerCase();
        if (usedUsernames.has(username)) continue;
        usedUsernames.add(username);

        const user = await prisma.user.create({
            data: {
                username,
                passwordHash: await bcrypt.hash('secret', 12),
                displayName: faker.person.fullName(),
            },
        });
        users.push(user);
    }

    return users;
}

const seedTags = async () => {
    const numTags = faker.number.int(NUM_TAGS);
    console.log(`Seeding ${numTags} tags...`);
    const tagNames = new Set<string>();
    while (tagNames.size < numTags) {
        const newTag = faker.word.noun().toLowerCase();
        if (tagNames.has(newTag)) continue;
        tagNames.add(faker.word.noun().toLowerCase());
    }

    const tags = [];
    for (const tagName of tagNames) {
        const tag = await prisma.tag.create({data: {tagName}});
        tags.push(tag);
    }

    return tags;
}

const seedPosts = async (users: Awaited<ReturnType<typeof seedUsers>>, tags: Awaited<ReturnType<typeof seedTags>>) => {
    console.log("Seeding posts...");
    const posts = [];

    for (const user of users) {
        const numPosts = faker.number.int(POSTS_PER_USER);

        for (let i = 0; i < numPosts; i++) {
            const numTags = faker.number.int(TAGS_PER_POST);
            const postTags = faker.helpers.arrayElements(tags, Math.min(numTags, tags.length));

            const post = await prisma.post.create({
                data: {
                    title: faker.lorem.sentence({min: 1, max: 2}),
                    content: faker.datatype.boolean(0.85)
                        ? faker.lorem.paragraphs({min: 1, max: 4}, "\n\n")
                        : null,
                    tags: {
                        connect: postTags.map((tag) => ({tagName: tag.tagName})),
                    },
                    userId: user.id,
                },
            });
            posts.push(post);
        }
    }

    return posts;
}

const seedVotes = async (users: Awaited<ReturnType<typeof seedUsers>>, posts: Awaited<ReturnType<typeof seedPosts>>) => {
    console.log("Seeding votes...");

    for (const post of posts) {
        let scoreDelta = 0;

        for (const user of users) {
            if (Math.random() > VOTE_CHANCE) continue;

            const upvote = Math.random() < UPVOTE_CHANCE;

            await prisma.vote.create({
                data: {
                    postId: post.id,
                    userId: user.id,
                    upvote,
                },
            });

            scoreDelta += upvote ? 1 : -1;
        }

        await prisma.post.update({
            where: {id: post.id},
            data: {score: scoreDelta},
        });
    }
}

const seedComments = async (users: Awaited<ReturnType<typeof seedUsers>>, posts: Awaited<ReturnType<typeof seedPosts>>) => {
    console.log("Seeding comments...");

    for (const post of posts) {
        const numComments = faker.number.int(COMMENTS_PER_POST);
        if (numComments === 0) continue;

        const commentsForPost: { id: number }[] = [];

        for (let i = 0; i < numComments; i++) {
            const author = faker.helpers.arrayElement(users);

            const isReply = commentsForPost.length > 0 && Math.random() < REPLY_CHANCE;
            const parentCommentId = isReply
                ? faker.helpers.arrayElement(commentsForPost).id
                : undefined;

            const comment = await prisma.comment.create({
                data: {
                    content: faker.lorem.sentences({min: 1, max: 3}),
                    userId: author.id,
                    postId: post.id,
                    parentCommentId,
                },
            });

            commentsForPost.push({id: comment.id});
        }
    }
}


const main = async () => {
    await clearDatabase();

    const users = await seedUsers();
    const tags = await seedTags();
    const posts = await seedPosts(users, tags);
    await seedVotes(users, posts);
    await seedComments(users, posts);

    console.log("Seeding complete:");
    console.log(`  Users: ${users.length}`);
    console.log(`  Tags: ${tags.length}`);
    console.log(`  Posts: ${posts.length}`);
}

try {
    await main()
    await prisma.$disconnect();
    await pool.end();
} catch (e) {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
}