import type { Post } from '../types';

const apiURL = import.meta.env.VITE_API_URL;

const getAll = async () => {
    const response = await fetch(`${apiURL}/posts`);
    const posts: Post[] = await response.json();
    console.log(posts);
    return posts;
};

export default { getAll };
