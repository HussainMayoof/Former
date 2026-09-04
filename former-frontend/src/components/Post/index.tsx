import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { usePost, usePostActions } from '../../store.ts';
import PostItem from './PostItem.tsx';
import PostSkeleton from './PostSkeleton.tsx';
import { getComments } from '../../services/CommentService.ts';
import type { CommentWithChildren } from '../../types.ts';

const Post = () => {
    const id = useParams().id;

    const { post, loading } = usePost();
    const { getPost } = usePostActions();

    const [comments, setComments] = useState<CommentWithChildren[] | undefined>(
        undefined,
    );

    useEffect(() => {
        if (!id) return;
        void getPost(id);
    }, [id, getPost]);

    useEffect(() => {
        if (post?.title) {
            document.title = `Former - ${post.title}`;
        }
    }, [post?.title]);

    useEffect(() => {
        const fetchComments = async () => {
            if (!id) return;
            const comments = await getComments(id);
            setComments(comments);
        };
        void fetchComments();
    }, [id]);

    if (!id) return null;

    if (loading || !post || !comments) return <PostSkeleton />;

    return <PostItem post={post} comments={comments} />;
};

export default Post;
