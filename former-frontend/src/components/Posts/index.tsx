import { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/PostService.ts';
import type { PostWithUser } from '../../types.ts';
import SinglePost from './SinglePost.tsx';

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
            <div className="flex flex-col items-center mt-4">
                {posts.map((post) => (
                    <SinglePost key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Posts;
