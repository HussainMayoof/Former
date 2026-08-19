import type { JwtPayload } from 'jsonwebtoken';
import type { Request } from 'express';
import type { Prisma } from '@former/shared/schemas';

export type Token = {
    id: number;
};

export type TokenRequest = Request & { token?: Token | JwtPayload };

export type PostWithUser = Prisma.PostGetPayload<{
    include: {
        user: {
            select: {
                displayName: true;
            };
        };
    };
}>;

export interface Post extends PostWithUser {
    userVote?: boolean;
}
