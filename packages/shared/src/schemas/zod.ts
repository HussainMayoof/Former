import {z} from 'zod';
import {Prisma} from '../generated/prisma/client.js';

export const UserCreateParams = z.object({
    username: z.string().min(4).max(20),
    password: z.string().min(6).max(40),
});

export const UserCreateInput = z.object({
    username: z.string().min(4).max(20),
    passwordHash: z.string(),
    displayName: z.string().min(4).max(20),
}) satisfies z.Schema<Prisma.UserUncheckedCreateInput>;

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
