import { create } from 'zustand';
import type { PostsState, UserState } from './types.ts';
import {
    login as loginRequest,
    register as registerRequest,
} from './services/UserService.ts';
import { persist } from 'zustand/middleware';
import { createPost, getAllPosts } from './services/PostService.ts';
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

const usePostsStore = create<PostsState>((set) => ({
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
