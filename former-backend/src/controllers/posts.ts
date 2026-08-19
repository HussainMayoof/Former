import { Router } from 'express';
import { Prisma, prisma } from '@former/shared/db';
import { optionalTokenExtractor, tokenExtractor } from '../util/middleware.js';
import type { Post, TokenRequest } from '../types.js';
import { PostCreateInput, PostParams } from '@former/shared/schemas';

const PostsRouter = Router();

//Get all posts
PostsRouter.get('/', optionalTokenExtractor, async (req: TokenRequest, res) => {
    const posts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    displayName: true,
                },
            },
        },
    });

    let postsResponse: Post[] = [];
    if (req.token) {
        for (const post of posts) {
            const vote = await prisma.vote.findUnique({
                where: {
                    // eslint-disable-next-line camelcase -- Prisma provides this by default
                    postId_userId: {
                        postId: post.id,
                        userId: req.token.id,
                    },
                },
            });

            if (vote) {
                const userVote = vote.upvote;
                postsResponse = postsResponse.concat({ ...post, userVote });
            } else {
                postsResponse = postsResponse.concat({ ...post });
            }
        }
    } else {
        postsResponse = posts;
    }

    console.log(postsResponse);

    res.json(postsResponse);
});

//Get one post
PostsRouter.get(
    '/:id',
    optionalTokenExtractor,
    async (req: TokenRequest, res) => {
        const id = req.params.id as string;
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        displayName: true,
                    },
                },
                tags: {
                    select: {
                        tagName: true,
                    },
                },
            },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (req.token) {
            const vote = await prisma.vote.findUnique({
                where: {
                    // eslint-disable-next-line camelcase -- Prisma provides this by default
                    postId_userId: {
                        postId: id,
                        userId: req.token.id,
                    },
                },
            });
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

        const existingVote = await prisma.vote.findUnique({
            where: {
                // eslint-disable-next-line camelcase -- Prisma provides this by default
                postId_userId: {
                    postId: req.params.id,
                    userId: req.token.id,
                },
            },
        });

        let post;
        try {
            if (!existingVote) {
                post = await prisma.post.update({
                    where: { id: req.params.id },
                    data: {
                        score: upvote ? { increment: 1 } : { decrement: 1 },
                    },
                    include: {
                        user: {
                            select: {
                                displayName: true,
                            },
                        },
                        tags: {
                            select: {
                                tagName: true,
                            },
                        },
                    },
                });
            } else if (existingVote.upvote !== upvote) {
                post = await prisma.post.update({
                    where: { id: req.params.id },
                    data: {
                        score: upvote ? { increment: 2 } : { decrement: 2 },
                    },
                    include: {
                        user: {
                            select: {
                                displayName: true,
                            },
                        },
                        tags: {
                            select: {
                                tagName: true,
                            },
                        },
                    },
                });
            } else {
                post = await prisma.post.findUnique({
                    where: { id: req.params.id },
                    include: {
                        user: {
                            select: {
                                displayName: true,
                            },
                        },
                        tags: {
                            select: {
                                tagName: true,
                            },
                        },
                    },
                });
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return res.status(404).json({ error: 'Post not found' });
                }
            }
            return res.status(500).json({ error: 'Internal server error' });
        }

        const vote = await prisma.vote.upsert({
            where: {
                // eslint-disable-next-line camelcase -- Prisma provides this by default
                postId_userId: {
                    postId: req.params.id,
                    userId: req.token.id,
                },
            },
            update: {
                upvote,
            },
            create: {
                postId: req.params.id,
                userId: req.token.id,
                upvote,
            },
        });

        const userVote = vote.upvote;

        return res.json({ ...post, userVote });
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

        const existingVote = await prisma.vote.findUnique({
            where: {
                // eslint-disable-next-line camelcase -- Prisma provides this by default
                postId_userId: {
                    postId: req.params.id,
                    userId: req.token.id,
                },
            },
        });

        let post;
        try {
            if (!existingVote) {
                post = await prisma.post.findFirst({
                    where: { id: req.params.id },
                    include: {
                        user: {
                            select: {
                                displayName: true,
                            },
                        },
                        tags: {
                            select: {
                                tagName: true,
                            },
                        },
                    },
                });
            } else {
                post = await prisma.post.update({
                    where: { id: req.params.id },
                    data: {
                        score: existingVote.upvote
                            ? { decrement: 1 }
                            : { increment: 1 },
                    },
                    include: {
                        user: {
                            select: {
                                displayName: true,
                            },
                        },
                        tags: {
                            select: {
                                tagName: true,
                            },
                        },
                    },
                });

                await prisma.vote.delete({
                    where: {
                        // eslint-disable-next-line camelcase -- Prisma provides this by default
                        postId_userId: {
                            postId: req.params.id,
                            userId: req.token.id,
                        },
                    },
                });
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return res.status(404).json({ error: 'Post not found' });
                }
            }
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.json(post);
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
