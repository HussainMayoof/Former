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
