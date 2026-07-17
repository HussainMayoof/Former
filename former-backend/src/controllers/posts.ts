import { Router } from 'express';
import prisma from '../util/prisma.js';
import { tokenExtractor } from '../util/middleware.js';
import type { TokenRequest } from '../types.js';
import { PostParams } from '../util/zod.js';

const PostsRouter = Router();

//Get all posts
PostsRouter.get('/', async (_req, res) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
});

//Create a new post
PostsRouter.post('/', tokenExtractor, async (req: TokenRequest, res) => {
    const { title, content = null } = PostParams.parse(req.body);
    if (!req.token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const post = await prisma.post.create({
        data: {
            title,
            content,
            userId: req.token.id,
        },
    });

    return res.json(post);
});

export default PostsRouter;
