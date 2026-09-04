import {PrismaPg} from '@prisma/adapter-pg';
import {DATABASE_URL} from '../util/config.js';
import {PrismaClient} from '../generated/prisma/client.js';
import {UserCreateInput} from './index.js';
import {
    PostOrderByWithRelationInput,
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
            $findManyWithUser: async ({orderBy}: { orderBy: PostOrderByWithRelationInput }) => {
                return await prisma.post.findMany({
                    include: {
                        user: {
                            select: {
                                displayName: true,
                            },
                        },
                    },
                    orderBy
                })
            },

            $findOneWithUserAndTags: async ({where}: { where: PostWhereInput }) => {
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

            $updateWithUserAndTags: async ({where, data}: { where: PostWhereUniqueInput, data: PostUpdateInput }) => {
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
        },
        vote: {
            $findUnique: async (postId: string, userId: string) => {
                return prisma.vote.findUnique({
                    where: {
                        postId_userId: {postId, userId}
                    },
                })
            }
        },
        comment: {
            $findMany: async (postId: string) => {
                const post = await prisma.post.findUnique({
                    where: {id: postId},
                    select: {
                        comments: {
                            include: {
                                user: {
                                    select: {
                                        displayName: true,
                                    },
                                },
                            },
                            orderBy: {
                                createdAt: 'asc',
                            },
                        },
                    },
                });

                if (!post) {
                    return null;
                }

                const postComments = post.comments;
                const commentMap = new Map();
                postComments.forEach((comment) => {
                    commentMap.set(comment.id, {...comment, childComments: []});
                });
                const comments: any[] = [];

                postComments.forEach((comment) => {
                    const data = commentMap.get(comment.id)!;
                    if (!comment.parentCommentId) {
                        comments.push(data);
                    } else {
                        const parent = commentMap.get(comment.parentCommentId);
                        if (parent) {
                            parent.childComments.push(data);
                        }
                    }
                });

                return comments;
            }
        }
    },
    query: {
        user: {
            create: ({args, query}) => {
                args.data = UserCreateInput.parse(args.data);
                return query(args);
            },
        },
    },
    client: {
        $vote: async (postId: string, userId: string, upvote: boolean) => {
            const existingVote = await prisma.vote.findUnique({
                where: {postId_userId: {postId, userId}}
            });

            const vote = await prisma.vote.upsert({
                where: {postId_userId: {postId, userId}},
                update: {upvote},
                create: {postId, userId, upvote},
            });

            const userVote = vote.upvote;

            let post;
            if (!existingVote) {
                const deltaScore = upvote ? 1 : -1;

                post = await prisma.post.$updateWithUserAndTags({
                    where: {id: postId},
                    data: {
                        score: {increment: deltaScore},
                    },
                });

                await prisma.user.update({
                    where: {id: post.userId},
                    data: {
                        formits: {increment: deltaScore},
                    },
                })
            } else if (existingVote.upvote !== upvote) {
                const deltaScore = upvote ? 2 : -2;

                post = await prisma.post.$updateWithUserAndTags({
                    where: {id: postId},
                    data: {
                        score: {increment: deltaScore},
                    },
                });

                await prisma.user.update({
                    where: {id: post.userId},
                    data: {
                        formits: {increment: deltaScore},
                    },
                })
            } else {
                post = await prisma.post.$findOneWithUserAndTags({
                    where: {id: postId},
                });
            }


            return {...post, userVote};
        },

        $unvote: async (postId: string, userId: string) => {
            const existingVote = await prisma.vote.$findUnique(postId, userId);

            if (!existingVote) {
                return await prisma.post.$findOneWithUserAndTags({
                    where: {id: postId},
                });
            } else {
                const deltaScore = existingVote.upvote ? -1 : 1;

                await prisma.vote.delete({where: {postId_userId: {postId, userId},},});

                const post = await prisma.post.$updateWithUserAndTags({
                    where: {id: postId},
                    data: {score: {increment: deltaScore}},
                });

                await prisma.user.update({
                    where: {id: post.userId},
                    data: {formits: {increment: deltaScore}},
                })

                return post;
            }
        }
    }
});

export default prisma;
