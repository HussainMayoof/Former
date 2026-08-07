import type { Prisma } from '../../former-backend/src/generated/prisma/client.ts';

export type PostWithUser = Prisma.PostGetPayload<{
    include: {
        user: {
            select: {
                displayName: true;
            };
        };
    };
}>;

export type PostWithUserAndTags = Prisma.PostGetPayload<{
    include: {
        user: {
            select: {
                displayName: true;
            };
        };
        tags: {
            select: {
                tagName: true;
            };
        };
    };
}>;

export interface AuthenticatedUser {
    username: string;
    token: string;
}

export interface UserState {
    user?: AuthenticatedUser;
    actions: {
        login: (username: string, password: string) => Promise<void>;
        register: (username: string, password: string) => Promise<void>;
        logout: () => void;
    };
}
