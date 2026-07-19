import { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/PostService.ts';
import type { PostWithUser } from '../../types.ts';
import { Link } from 'react-router';

const Posts = () => {
    const [posts, setPosts] = useState<PostWithUser[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            setPosts(await getAllPosts());
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
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
