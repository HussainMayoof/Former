import type { CommentWithChildren } from '../types.ts';
import { authorisedRequest } from '../util/helpers.ts';

const apiURL = import.meta.env.VITE_API_URL;

export const getComments = async (postId: string) => {
    const response = await fetch(`${apiURL}/comments/${postId}`);
    const comments: CommentWithChildren[] = await response.json();
    return comments;
};

export const createComment = async (
    content: string,
    postId: string,
    commentId?: number,
) => {
    const url = commentId
        ? `comments/${postId}/${commentId}`
        : `comments/${postId}`;
    const response = await authorisedRequest(url, 'POST', false, { content });

    if (!response.ok) {
        return { error: (await response.json()).error };
    }

    return await response.json();
};
