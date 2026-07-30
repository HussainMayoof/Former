import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getPost } from '../../services/PostService.ts';
import type { PostWithUser } from '../../types.ts';

const Post = () => {
    const id = useParams().id;
    const [post, setPost] = useState<PostWithUser>();

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                setPost(await getPost(id));
            }
        };

        fetchPost();
    }, [id]);

    if (!id) return null;

    if (!post) return null;

    return (
        <div className="p-12 m-6 border-2 rounded-4xl flex-1">
            <p className="font-semibold text-lg">{post.title}</p>
            {post.tags && (
                <div className="flex gap-2 my-2">
                    {post.tags.map((tag) => (
                        <Link
                            to="/"
                            key={tag}
                            className="bg-blue-400 hover:bg-blue-500 transition-colors duration-300 rounded-sm py-1 px-1.5 text-sm text-black"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>
            )}
            <p className="font-thin text-sm mb-2">
                Posted by{' '}
                <Link to="/" className="font-medium hover:underline">
                    {post.user.displayName
                        ? post.user.displayName
                        : post.user.username}
                </Link>
            </p>
            <hr />

            <p className="mt-2">{post.content}</p>
        </div>
    );
};

export default Post;
