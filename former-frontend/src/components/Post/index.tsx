import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getPost } from '../../services/PostService.ts';
import type { Post } from '../../types.ts';

const Post = () => {
    const id = useParams().id;
    const [post, setPost] = useState<Post>();

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
        <div>
            <p>{post.title}</p>
        </div>
    );
};

export default Post;
