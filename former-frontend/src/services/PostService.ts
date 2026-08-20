import type { NewPost, Post, SinglePost } from '../types';
import { useUserStore } from '../store.ts';

const apiURL = import.meta.env.VITE_API_URL;

const authorisedRequest = async (
    url: string,
    method: 'GET' | 'POST' | 'DELETE',
    allowUnauthorised: boolean = false,
    body?: object,
) => {
    const token = useUserStore.getState().user?.token;

    if (!token) {
        if (allowUnauthorised) {
            return await fetch(`${apiURL}/${url}`, {
                method,
                body: body ? JSON.stringify(body) : undefined,
            });
        } else {
            throw new Error('Unauthorised');
        }
    }

    return await fetch(`${apiURL}/${url}`, {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });
};

export const getAllPosts = async () => {
    const response = await authorisedRequest('posts', 'GET', true);
    const posts: Post[] = await response.json();
    return posts;
};

export const getPost = async (id: string) => {
    const response = await authorisedRequest(`posts/${id}`, 'GET', true);
    const post: SinglePost = await response.json();
    return post;
};

export const createPost = async (post: NewPost) => {
    const response = await authorisedRequest('posts', 'POST', false, post);

    if (!response.ok) {
        return { error: (await response.json()).error };
    }

    return await response.json();
};

export const votePost = async (id: string, upvote: boolean) => {
    const response = await authorisedRequest(
        `posts/${id}/vote`,
        'POST',
        false,
        { upvote },
    );

    if (!response.ok) {
        return { error: (await response.json()).error };
    }

    return await response.json();
};

export const unvotePost = async (id: string) => {
    const response = await authorisedRequest(
        `posts/${id}/vote`,
        'DELETE',
        false,
    );

    if (!response.ok) {
        return { error: (await response.json()).error };
    }

    return await response.json();
};
