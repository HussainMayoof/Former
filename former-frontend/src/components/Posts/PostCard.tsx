import type { Post } from '../../types.ts';
import { useNavigate } from 'react-router';
import UnderlinedLink from '../shared/UnderlinedLink.tsx';
import VoteButtons from './VoteButtons.tsx';
import { useUser } from '../../store.ts';
import type { MouseEvent } from 'react';

interface Props {
    post: Post;
}

const PostCard = ({ post }: Props) => {
    const navigate = useNavigate();
    const user = useUser();

    if (!post) return;

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        navigate(`/posts/${post.id}`, { viewTransition: true });
    };

    return (
        <>
            <div
                className="hover:bg-base-300 transition-colors duration-100 rounded-lg w-3/4 p-2 cursor-pointer grid  grid-cols-[1fr_auto] gap-1"
                onClick={handleClick}
            >
                <div>
                    <UnderlinedLink to={`/users/${post.userId}`}>
                        <p className="text-sm duration-200">
                            {post.user.displayName}
                        </p>
                    </UnderlinedLink>
                    <p className="text-xl">{post.title}</p>
                    <p className="text-xs line-clamp-3">{post.content}</p>
                </div>

                {user && (
                    <div className="self-center me-2">
                        <VoteButtons
                            id={post.id}
                            score={post.score}
                            userVote={post.userVote}
                        />
                    </div>
                )}
            </div>

            <hr className="min-w-3/4 my-1" />
        </>
    );
};

export default PostCard;
