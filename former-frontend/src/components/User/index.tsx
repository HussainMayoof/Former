import { useEffect, useState } from 'react';
import type { User } from '../../types';
import { useParams } from 'react-router';
import { getUser } from '../../services/UserService.ts';
import PostsBody from '../Posts/PostsBody.tsx';

const User = () => {
    const [user, setUser] = useState<User | null>(null);
    const { username } = useParams();

    useEffect(() => {
        if (!username) return;

        const setCurrentUser = async () => {
            setUser(await getUser(username));
        };

        void setCurrentUser();
    }, [username]);

    if (!user) return null;

    return (
        <div className="p-4 flex flex-col">
            <div className="grid grid-cols-2">
                <div>
                    <div className="flex gap-2 items-center">
                        <div
                            className="avatar cursor-default avatar-placeholder"
                            tabIndex={0}
                            role="button"
                        >
                            <div className="bg-neutral text-neutral-content w-14 rounded-full">
                                <span className="text-xl">
                                    {user.username[0].toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <div
                            className="tooltip tooltip-bottom"
                            data-tip={`Username: ${user.username}`}
                        >
                            <h2 className="text-2xl font-semibold">
                                {user.displayName}
                            </h2>
                        </div>
                    </div>

                    <div className="ps-16 font-bold">
                        Formits: {user.formits}
                    </div>
                </div>

                <div className="flex gap-2 items-center justify-end">
                    <button className="btn btn-primary">
                        Change Display Name
                    </button>
                </div>
            </div>

            <hr className="min-w-3/4 my-4" />

            <PostsBody
                posts={user.posts.map((post) => ({
                    ...post,
                    user: {
                        username: user.username,
                        displayName: user.displayName,
                    },
                }))}
                loading={false}
                showVoteButtons={false}
            />
        </div>
    );
};

export default User;
