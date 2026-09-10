import PostCardSkeleton from './PostCardSkeleton.tsx';
import PostCard from './PostCard.tsx';
import type { Post } from '../../types.ts';

type Props = {
    posts: Post[];
    loading: boolean;
    showVoteButtons?: boolean;
};

const PostsBody = ({ posts, loading, showVoteButtons = true }: Props) => {
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

    if (!posts.length) return <div className="text-center">No posts yet</div>;

    return (
        <div className="flex flex-col items-center mt-4">
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    showVoteButtons={showVoteButtons}
                />
            ))}
        </div>
    );
};

export default PostsBody;
