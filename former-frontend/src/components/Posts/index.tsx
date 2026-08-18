import { useEffect } from 'react';
import PostCard from './PostCard.tsx';
import { usePosts, usePostsActions } from '../../store.ts';
import PostCardSkeleton from './PostCardSkeleton.tsx';

const Posts = () => {
    const { posts, loading } = usePosts();
    const { getPosts } = usePostsActions();

    useEffect(() => {
        void getPosts();
    }, [getPosts]);

    useEffect(() => {
        document.title = 'Former';
    }, []);

    if (loading || !posts) {
        return (
            <div className="flex flex-col gap-2 items-center mt-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col items-center mt-4">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Posts;
