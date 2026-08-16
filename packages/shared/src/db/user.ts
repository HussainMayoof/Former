import {z} from "zod";
import {Prisma} from '../generated/prisma/client.js';

export const UserCreateInput = z.object({
    username: z.string().min(4).max(20),
    passwordHash: z.string(),
    displayName: z.string().min(4).max(20),
}) satisfies z.Schema<Prisma.UserUncheckedCreateInput>;