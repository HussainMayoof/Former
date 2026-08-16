import type { PostWithUser } from '../../types.ts';
import { useNavigate } from 'react-router';
import UnderlinedLink from '../shared/UnderlinedLink.tsx';

const SinglePost = ({ post }: { post: PostWithUser }) => {
    const navigate = useNavigate();

    if (!post) return;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        navigate(`/posts/${post.id}`, { viewTransition: true });
    };

    return (
        <>
            <div
                className="hover:bg-base-300 transition-colors duration-100 rounded-lg w-3/4 p-2 cursor-pointer"
                onClick={handleClick}
            >
                <UnderlinedLink to={`/users/${post.userId}`}>
                    <p className="text-sm duration-200">
                        {post.user.displayName}
                    </p>
                </UnderlinedLink>
                <p className="text-xl">{post.title}</p>
                <p className="text-xs line-clamp-2">{post.content}</p>
            </div>

            <hr className="min-w-3/4 my-1" />
        </>
    );
};

export default SinglePost;
