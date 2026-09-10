import type { User } from '../../types.ts';
import UnderlinedLink from '../shared/UnderlinedLink.tsx';
import { useNavigate } from 'react-router';
import type { MouseEvent } from 'react';

type Props = {
    user: User;
};

const Comments = ({ user }: Props) => {
    const navigate = useNavigate();

    const handleClick = (e: MouseEvent<HTMLDivElement>, postId: string) => {
        e.preventDefault();
        navigate(`/posts/${postId}`, { viewTransition: true });
    };

    if (!user.comments.length)
        return <div className="text-center">No comments yet</div>;

    return (
        <div className="flex flex-col items-center mt-4">
            {user.comments.map((comment) => (
                <div
                    className="flex flex-col w-3/4 items-center"
                    key={comment.id}
                >
                    <div
                        className="hover:bg-base-300 transition-colors duration-100 rounded-lg w-3/4 p-2 cursor-pointer grid  grid-cols-[1fr_auto] gap-1"
                        onClick={(e) => handleClick(e, comment.postId)}
                    >
                        <div>
                            <div className="flex items-center gap-1">
                                <UnderlinedLink to={`/users/${user.username}`}>
                                    <p className="text-sm duration-200 font-bold">
                                        {user.displayName}
                                    </p>
                                </UnderlinedLink>{' '}
                                commented on{' '}
                                <UnderlinedLink to={`/posts/${comment.postId}`}>
                                    <p className="text-md font-bold">
                                        {comment.post.title}
                                    </p>
                                </UnderlinedLink>
                            </div>
                            <p className="text-sm line-clamp-3">
                                {comment.content}
                            </p>
                        </div>
                    </div>

                    <hr className="min-w-3/4 my-1" />
                </div>
            ))}
        </div>
    );
};

export default Comments;
