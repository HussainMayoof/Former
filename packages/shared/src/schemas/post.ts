import {z} from 'zod';

export const PostParams = z.object({
    title: z.string().min(1).max(50),
    content: z.string().max(10000).optional(),
    tags: z.array(z.string()).max(10),
});

export const PostCreateInput = z.object({
    title: z.string().min(1).max(50),
    content: z.string().max(10000).optional(),
    tags: z.array(z.string().min(1).max(10)).max(5).optional(),
});

export type PostCreateInputType = z.infer<typeof PostCreateInput>;