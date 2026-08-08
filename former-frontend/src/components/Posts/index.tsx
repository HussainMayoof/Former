import { useEffect } from 'react';
import SinglePost from './SinglePost.tsx';
import { usePosts, usePostsActions } from '../../store.ts';

const Posts = () => {
    // const [posts, setPosts] = useState<PostWithUser[]>([]);
    const posts = usePosts();
    const { getPosts } = usePostsActions();

    useEffect(() => {
        getPosts();
    }, [getPosts]);

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
