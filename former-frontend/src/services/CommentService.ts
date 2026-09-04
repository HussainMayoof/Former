import type { CommentWithChildren } from '../types.ts';

const apiURL = import.meta.env.VITE_API_URL;

export const getComments = async (postId: string) => {
    const response = await fetch(`${apiURL}/comments/${postId}`);
    const comments: CommentWithChildren[] = await response.json();
    return comments;
};
