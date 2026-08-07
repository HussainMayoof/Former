import type { PostWithUser, PostWithUserAndTags } from '../types';

const apiURL = import.meta.env.VITE_API_URL;

export const getAllPosts = async () => {
    const response = await fetch(`${apiURL}/posts`);
    const posts: PostWithUser[] = await response.json();
    return posts;
};

export const getPost = async (id: string) => {
    const response = await fetch(`${apiURL}/posts/${id}`);
    const post: PostWithUserAndTags = await response.json();
    return post;
};
