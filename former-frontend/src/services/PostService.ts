import type { NewPost, Post, SinglePost } from '../types';
import { authorisedRequest } from '../util/helpers.ts';

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
