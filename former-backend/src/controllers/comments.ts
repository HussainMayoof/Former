import { Router } from 'express';
import { prisma } from '@former/shared/db';
import type { CommentWithChildren } from '../types.js';

const CommentsRouter = Router();

CommentsRouter.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const post = await prisma.post.findUnique({
        where: { id: postId },
        select: {
            comments: true,
        },
    });

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const postComments = post.comments;
    const commentMap = new Map<number, CommentWithChildren>();
    postComments.forEach((comment) => {
        commentMap.set(comment.id, { ...comment, childComments: [] });
    });

    const comments: CommentWithChildren[] = [];

    postComments.forEach((comment) => {
        const data = commentMap.get(comment.id)!;
        if (!comment.parentCommentId) {
            comments.push(data);
        } else {
            const parent = commentMap.get(comment.parentCommentId);
            if (parent) {
                parent.childComments.push(data);
            }
        }
    });

    return res.json(comments);
});

export default CommentsRouter;
