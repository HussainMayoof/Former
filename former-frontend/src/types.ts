import type { Prisma } from '@former/shared/schemas';
import type { PostCreateInputType } from '@former/shared/schemas';

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

export interface Post extends PostWithUser {
    userVote?: boolean;
}

export interface SinglePost extends PostWithUserAndTags {
    userVote?: boolean;
}

export type NewPost = PostCreateInputType;

export type CommentWithChildren = Prisma.CommentGetPayload<{
    include: {
        user: {
            select: {
                displayName: true;
            };
        };
    };
}> & {
    childComments: CommentWithChildren[];
};

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
    posts: Post[];
    loading: boolean;
    actions: {
        getPosts: () => Promise<void>;
        addPost: (post: NewPost) => Promise<Prisma.PostModel>;
        votePost: (id: string, upvote: boolean) => Promise<void>;
        unvotePost: (id: string) => Promise<void>;
    };
}

export interface PostState {
    post?: PostWithUserAndTags;
    loading: boolean;
    actions: {
        getPost: (id: string) => Promise<void>;
        votePost: (upvote: boolean) => Promise<void>;
        unvotePost: () => Promise<void>;
    };
}

export type AlertType = 'Error' | 'Warning';

export interface AlertState {
    alert: { show: boolean; type: AlertType; message: string };
    actions: {
        setAlert: (type: AlertType, message: string, duration?: number) => void;
    };
}
