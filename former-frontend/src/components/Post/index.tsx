import { useParams } from 'react-router';
import { useEffect } from 'react';
import { usePost, usePostActions } from '../../store.ts';
import PostItem from './PostItem.tsx';
import PostSkeleton from './PostSkeleton.tsx';

const Post = () => {
    const id = useParams().id;

    const { post, loading } = usePost();
    const { getPost } = usePostActions();

    useEffect(() => {
        if (!id) return;
        void getPost(id);
    }, [id, getPost]);

    useEffect(() => {
        if (post?.title) {
            document.title = `Former - ${post.title}`;
        }
    }, [post?.title]);

    if (!id) return null;

    if (loading || !post) return <PostSkeleton />;

    return <PostItem post={post} />;
};

export default Post;
