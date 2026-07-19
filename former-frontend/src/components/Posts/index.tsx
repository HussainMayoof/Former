import { useEffect, useState } from 'react';
import PostService from '../../services/PostService.ts';
import type { Post } from '../../types.ts';

const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            setPosts(await PostService.getAll());
        };

        fetchPosts();
    }, []);

    if (!posts) {
        return null;
    }

    return (
        <div>
            <h1>Posts:</h1>
            <ul className="list-disc pl-5">
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
