import { create } from 'zustand';
import type { PostState } from '../types.ts';
import { getPost, unvotePost, votePost } from '../services/PostService.ts';

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

export default usePostStore;
