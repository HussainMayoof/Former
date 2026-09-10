import { useEffect, useState } from 'react';
import type { User } from '../../types';
import { useParams } from 'react-router';
import { getUser } from '../../services/UserService.ts';
import PostsBody from '../Posts/PostsBody.tsx';
import Comments from './Comments.tsx';
import UserInfo from './UserInfo.tsx';

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

    useEffect(() => {
        if (user) {
            document.title = `Former - ${user.username}`;
        } else {
            document.title = 'Former';
        }
    }, [user]);

    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    if (!user) return null;

    return (
        <div className="p-4 flex flex-col">
            <UserInfo user={user} setUser={setUser} />

            <hr className="min-w-3/4 my-4" />

            <div role="tablist" className="tabs tabs-border">
                <a
                    role="tab"
                    className={`tab duration-200 ${activeTab === 0 && 'tab-active'}`}
                    onClick={() => handleTabClick(0)}
                >
                    Posts
                </a>
                <a
                    role="tab"
                    className={`tab duration-200 ${activeTab === 1 && 'tab-active'}`}
                    onClick={() => handleTabClick(1)}
                >
                    Comments
                </a>
            </div>

            {activeTab === 0 && (
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
            )}

            {activeTab === 1 && <Comments user={user} />}
        </div>
    );
};

export default User;
