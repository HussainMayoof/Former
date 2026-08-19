import { create } from 'zustand';
import type { PostsState, PostState, UserState } from './types.ts';
import {
    login as loginRequest,
    register as registerRequest,
} from './services/UserService.ts';
import { persist } from 'zustand/middleware';
import {
    createPost,
    getAllPosts,
    getPost,
    unvotePost,
    votePost,
} from './services/PostService.ts';
import { useShallow } from 'zustand/react/shallow';

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: undefined,
            actions: {
                login: async (username, password) => {
                    const response = await loginRequest(username, password);
                    if (!response.error) {
                        set({ user: response });
                    } else {
                        throw new Error(response.error);
                    }
                },
                register: async (username, password) => {
                    const response = await registerRequest(username, password);
                    if (!response.error) {
                        set({ user: response });
                    } else {
                        throw new Error(response.error);
                    }
                },
                logout: () => {
                    set({ user: undefined });
                },
            },
        }),
        { name: 'user-storage', partialize: (state) => ({ user: state.user }) },
    ),
);

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);

const usePostsStore = create<PostsState>((set, get) => ({
    posts: [],
    loading: false,
    actions: {
        getPosts: async () => {
            set({ loading: true });
            set({ posts: await getAllPosts() });
            set({ loading: false });
        },
        addPost: async (post) => {
            const response = await createPost(post);
            if (!response.error) {
                set((state) => ({ posts: state.posts.concat(response) }));
            } else {
                throw new Error(response.error);
            }
            return response;
        },
        votePost: async (id, upvote) => {
            const posts = get().posts;

            if (posts.find((post) => post.id === id)) {
                const updatedPost = await votePost(id, upvote);
                set({
                    posts: posts.map((post) =>
                        post.id === id ? updatedPost : post,
                    ),
                });
            }
        },
        unvotePost: async (id) => {
            const posts = get().posts;

            if (posts.find((post) => post.id === id)) {
                const updatedPost = await unvotePost(id);
                set({
                    posts: posts.map((post) =>
                        post.id === id ? updatedPost : post,
                    ),
                });
            }
        },
    },
}));

export const usePosts = () =>
    usePostsStore(
        useShallow((state) => ({
            posts: state.posts,
            loading: state.loading,
        })),
    );
export const usePostsActions = () => usePostsStore((state) => state.actions);

const usePostStore = create<PostState>((set, get) => ({
    post: undefined,
    loading: false,
    actions: {
        getPost: async (id: string) => {
            set({ loading: true });

            const post = await getPost(id);
            set({ post, loading: false });
        },
        votePost: async (upvote) => {
            const post = get().post;

            if (post) {
                const updatedPost = await votePost(post.id, upvote);
                set({
                    post: updatedPost,
                });
            }
        },
        unvotePost: async () => {
            const post = get().post;

            if (post) {
                const updatedPost = await unvotePost(post.id);
                set({
                    post: updatedPost,
                });
            }
        },
    },
}));

export const usePost = () =>
    usePostStore(
        useShallow((state) => ({
            post: state.post,
            loading: state.loading,
        })),
    );
export const usePostActions = () => usePostStore((state) => state.actions);
