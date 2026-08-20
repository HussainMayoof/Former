import { create } from 'zustand';
import type { PostsState } from '../types.ts';
import {
    createPost,
    getAllPosts,
    unvotePost,
    votePost,
} from '../services/PostService.ts';

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

export default usePostsStore;
