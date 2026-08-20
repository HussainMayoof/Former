import {PrismaPg} from '@prisma/adapter-pg';
import {DATABASE_URL} from '../util/config.js';
import {PrismaClient} from '../generated/prisma/client.js';
import {UserCreateInput} from './index.js';
import {
    PostUpdateInput,
    PostWhereInput,
    PostWhereUniqueInput
} from "../generated/prisma/models/Post.js";

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: DATABASE_URL,
        ...(process.env.NODE_ENV === 'production' ? {ssl: {rejectUnauthorized: false}} : {}),
    }),
}).$extends({
    model: {
        post: {
            findManyWithUser: async ()=>  {
                return await prisma.post.findMany({
                    include: {
                        user: {
                            select: {
                                displayName: true,
                            },
                        },
                    },
                })
            },

            findOneWithUserAndTags: async ({where}: { where: PostWhereInput }) => {
                return prisma.post.findFirst({
                    where,
                    include: {
                        user: {
                            select: {
                                displayName: true,
                            },
                        },
                        tags: {
                            select: {
                                tagName: true,
                            },
                        },
                    },
                })
            },

            updateWithUserAndTags: async ({where, data}: { where: PostWhereUniqueInput, data: PostUpdateInput }) => {
                return prisma.post.update({
                    where,
                    data,
                    include: {
                        user: {
                            select: {
                                displayName: true,
                            },
                        },
                        tags: {
                            select: {
                                tagName: true,
                            },
                        },
                    },
                })
            }
        }
    },
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
