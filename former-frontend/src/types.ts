import type { Prisma } from '@former/shared';
import type { PostCreateInputType } from '@former/shared';

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

export type NewPost = PostCreateInputType;

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

export interface PostsState {
    posts: PostWithUser[];
    actions: {
        getPosts: () => Promise<void>;
        addPost: (post: NewPost) => Promise<Prisma.PostModel>;
    };
}
