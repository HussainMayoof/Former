import { PrismaPg } from '@prisma/adapter-pg';
import { DATABASE_URL } from './config.js';
import { PrismaClient } from '../generated/prisma/client.js';
import { PostCreateInput, UserCreateInput } from './zod.js';

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: DATABASE_URL }),
}).$extends({
    query: {
        user: {
            create({ args, query }) {
                args.data = UserCreateInput.parse(args.data);
                return query(args);
            },
        },
        post: {
            create({ args, query }) {
                args.data = PostCreateInput.parse(args.data);
                return query(args);
            },
        },
    },
});

export default prisma;
