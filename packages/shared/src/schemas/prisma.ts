import {PrismaPg} from '@prisma/adapter-pg';
import {DATABASE_URL} from '../util/config.js';
import {PrismaClient} from '../generated/prisma/client.js';
import {UserCreateInput} from './zod.js';

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: DATABASE_URL,
        ...(process.env.NODE_ENV === 'production' ? {ssl: {rejectUnauthorized: false}} : {}),
    }),
}).$extends({
    query: {
        user: {
            create({args, query}) {
                args.data = UserCreateInput.parse(args.data);
                return query(args);
            },
        },
    },
});

export default prisma;
