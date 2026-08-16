import { useEffect } from 'react';
import PostCard from './PostCard.tsx';
import { usePosts, usePostsActions } from '../../store.ts';

const Posts = () => {
    // const [posts, setPosts] = useState<PostWithUser[]>([]);
    const posts = usePosts();
    const { getPosts } = usePostsActions();

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    useEffect(() => {
        document.title = 'Former';
    }, []);

    if (!posts) {
        return null;
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
