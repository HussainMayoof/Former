import { Router } from 'express';
import { Prisma, prisma } from '@former/shared/db';
import { optionalTokenExtractor, tokenExtractor } from '../util/middleware.js';
import type { Post, TokenRequest } from '../types.js';
import { PostCreateInput, PostParams } from '@former/shared/schemas';

const PostsRouter = Router();

//Get all posts
PostsRouter.get('/', optionalTokenExtractor, async (req: TokenRequest, res) => {
    const posts = await prisma.post.$findManyWithUser({
        orderBy: {
            score: 'desc',
        },
    });

    if (!req.token) {
        return res.json(posts);
    }

    const postsResponse: Post[] = await Promise.all(
        posts.map(async (post) => {
            const vote = await prisma.vote.$findUnique(post.id, req.token!.id);

            return vote ? { ...post, userVote: vote.upvote } : { ...post };
        }),
    );

    return res.json(postsResponse);
});

//Get one post
PostsRouter.get(
    '/:id',
    optionalTokenExtractor,
    async (req: TokenRequest, res) => {
        const id = req.params.id as string;
        const post = await prisma.post.$findOneWithUserAndTags({
            where: { id },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (req.token) {
            const vote = await prisma.vote.$findUnique(id, req.token.id);
            if (vote) {
                const userVote = vote.upvote;
                return res.json({ ...post, userVote });
            }
        }

        return res.json(post);
    },
);

// Vote on a post
PostsRouter.post(
    '/:id/vote',
    tokenExtractor,
    async (req: TokenRequest, res) => {
        const { upvote } = req.body;
        if (!req.token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!req.params.id || typeof req.params.id !== 'string') {
            return res.status(400).json({ error: 'Post ID is required' });
        }

        if (typeof upvote !== 'boolean') {
            return res.status(400).json({ error: 'Invalid vote type' });
        }

        const post = await prisma.$vote(req.params.id, req.token.id, upvote);

        return res.json(post);
    },
);

// Remove a vote
PostsRouter.delete(
    '/:id/vote',
    tokenExtractor,
    async (req: TokenRequest, res) => {
        if (!req.token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!req.params.id || typeof req.params.id !== 'string') {
            return res.status(400).json({ error: 'Post ID is required' });
        }

        try {
            const post = await prisma.$unvote(req.params.id, req.token.id);
            return res.json(post);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return res.status(404).json({ error: 'Post not found' });
                }
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
);

//Create a new post
PostsRouter.post('/', tokenExtractor, async (req: TokenRequest, res) => {
    const body = PostParams.parse(req.body);
    if (!req.token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { title, content, tags } = PostCreateInput.parse({
        ...body,
    });

    const post = await prisma.post.create({
        data: {
            title,
            content,
            tags: {
                connectOrCreate: (tags ?? []).map((tagName) => ({
                    where: { tagName: tagName.toLowerCase() },
                    create: { tagName: tagName.toLowerCase() },
                })),
            },
            userId: req.token.id,
        },
        include: {
            user: {
                select: {
                    displayName: true,
                },
            },
        },
    });

    return res.json(post);
});

export default PostsRouter;
