import { Link } from 'react-router';
import type { SinglePost } from '../../types.ts';
import { useUser } from '../../store.ts';
import VoteButtons from './VoteButtons.tsx';

interface Props {
    post: SinglePost;
}

const PostItem = ({ post }: Props) => {
    const user = useUser();

    return (
        <div className="p-12 m-6 border-2 rounded-4xl flex-1">
            <p className="font-semibold text-lg">{post.title}</p>
            {post.tags && (
                <div className="flex gap-2 my-2">
                    {post.tags.map((tag) => (
                        <Link
                            to={`/tags/${tag.tagName}`}
                            key={tag.tagName}
                            className="bg-blue-400 hover:bg-blue-500 transition-colors duration-300 rounded-sm py-1 px-1.5 text-sm text-black"
                            viewTransition
                        >
                            {tag.tagName}
                        </Link>
                    ))}
                </div>
            )}

            <div className="font-thin text-sm mb-2 ">
                <Link
                    to={`/users/${post.userId}`}
                    className="group w-fit hover:text-tertiary-content duration-200 items-center flex gap-0.5"
                    viewTransition
                >
                    <div className="avatar avatar-placeholder cursor-pointer">
                        <div className="bg-neutral text-neutral-content w-6 rounded-full">
                            <span className="text-md">
                                {post.user.displayName[0].toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <p className="font-medium duration-200">
                        {post.user.displayName}
                        <span
                            className={`block max-w-0 -mt-0.5 group-hover:max-w-full duration-200 h-px bg-tertiary-content`}
                        ></span>
                    </p>
                </Link>
            </div>

            <hr className="text-tertiary-content opacity-25" />

            <p className="my-4">{post.content}</p>

            <hr className="text-tertiary-content opacity-25" />

            {user && (
                <VoteButtons score={post.score} userVote={post.userVote} />
            )}
        </div>
    );
};

export default PostItem;
