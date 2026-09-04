import { Router } from 'express';
import { prisma } from '@former/shared/db';
import type { CommentWithChildren, TokenRequest } from '../types.js';
import { tokenExtractor } from '../util/middleware.js';

const CommentsRouter = Router();

// Get comments for a post
CommentsRouter.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const comments: CommentWithChildren[] | null =
        await prisma.comment.$findMany(postId);

    if (!comments) {
        return res.status(404).json({ error: 'Post not found' });
    }

    return res.json(comments);
});

// Create a parent comment
CommentsRouter.post(
    '/:postId',
    tokenExtractor,
    async (req: TokenRequest, res) => {
        if (!req.token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const userId = req.token.id;

        const postId = req.params.postId;
        if (!postId || typeof postId !== 'string') {
            return res.status(400).json({ error: 'Invalid postId' });
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const newComment = await prisma.comment.create({
            data: {
                postId,
                userId,
                content: req.body.content,
            },
        });

        return res.json(newComment);
    },
);

// Create a child comment
CommentsRouter.post(
    '/:postId/:parentCommentId',
    tokenExtractor,
    async (req: TokenRequest, res) => {
        if (!req.token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const userId = req.token.id;

        const postId = req.params.postId;
        if (!postId || typeof postId !== 'string') {
            return res.status(400).json({ error: 'Invalid postId' });
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const parentCommentId = Number(req.params.parentCommentId);
        if (
            !parentCommentId ||
            typeof parentCommentId !== 'number' ||
            isNaN(parentCommentId)
        ) {
            return res.status(400).json({ error: 'Invalid parentCommentId' });
        }

        const parentComment = await prisma.comment.findUnique({
            where: {
                id: parentCommentId,
                postId,
            },
        });

        if (!parentComment) {
            return res.status(404).json({ error: 'Parent comment not found' });
        }

        const newComment = await prisma.comment.create({
            data: {
                postId,
                userId,
                parentCommentId,
                content: req.body.content,
            },
        });

        return res.json(newComment);
    },
);

export default CommentsRouter;
