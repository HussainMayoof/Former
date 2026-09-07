import { useEffect } from 'react';
import { usePosts, usePostsActions } from '../../store.ts';
import PostsBody from './PostsBody.tsx';

const Posts = () => {
    const { posts, loading } = usePosts();
    const { getPosts } = usePostsActions();

    useEffect(() => {
        void getPosts();
    }, [getPosts]);

    useEffect(() => {
        document.title = 'Former';
    }, []);

    return <PostsBody posts={posts} loading={loading} />;
};

export default Posts;
