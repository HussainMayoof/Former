import { z } from 'zod';
import { Prisma } from '../generated/prisma/client.js';

export const UserCreateParams = z.object({
    username: z.string().min(4).max(20),
    password: z.string().min(6).max(40),
});

export const UserCreateInput = z.object({
    username: z.string().min(4).max(20),
    passwordHash: z.string(),
}) satisfies z.Schema<Prisma.UserUncheckedCreateInput>;

export const PostParams = z.object({
    title: z.string().min(1).max(50),
    content: z.string().max(200).optional(),
    tags: z.array(z.string()).max(10).optional(),
});

export const PostCreateInput = z.object({
    title: z.string().min(1).max(50),
    content: z.string().max(200).optional(),
    tags: z.array(z.string()).max(10).optional(),
    userId: z.number(),
}) satisfies z.Schema<Prisma.PostUncheckedCreateInput>;
