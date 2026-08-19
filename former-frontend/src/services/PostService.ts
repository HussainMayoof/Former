import type { NewPost, Post, SinglePost } from '../types';
import { useUserStore } from '../store.ts';

const apiURL = import.meta.env.VITE_API_URL;

export const getAllPosts = async () => {
    const token = useUserStore.getState().user?.token;

    const response = await fetch(`${apiURL}/posts/`, {
        headers: token
            ? {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
              }
            : undefined,
    });

    const posts: Post[] = await response.json();
    return posts;
};

export const getPost = async (id: string) => {
    const token = useUserStore.getState().user?.token;

    const response = await fetch(`${apiURL}/posts/${id}`, {
        headers: token
            ? {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
              }
            : undefined,
    });
    const post: SinglePost = await response.json();
    return post;
};

export const createPost = async (post: NewPost) => {
    const token = useUserStore.getState().user?.token;

    const response = await fetch(`${apiURL}/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });

    if (!response.ok) {
        return { error: (await response.json()).error };
    }

    return await response.json();
};

export const votePost = async (id: string, upvote: boolean) => {
    const token = useUserStore.getState().user?.token;

    const response = await fetch(`${apiURL}/posts/${id}/vote`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ upvote }),
    });

    if (!response.ok) {
        return { error: (await response.json()).error };
    }

    return await response.json();
};

export const unvotePost = async (id: string) => {
    const token = useUserStore.getState().user?.token;

    const response = await fetch(`${apiURL}/posts/${id}/vote`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        return { error: (await response.json()).error };
    }

    return await response.json();
};
