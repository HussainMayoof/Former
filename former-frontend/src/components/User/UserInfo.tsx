import type { User } from '../../types';
import { useUser } from '../../store.ts';
import ChangeDisplayName from './ChangeDisplayName.tsx';
import type { Dispatch, SetStateAction } from 'react';
import ChangePassword from './ChangePassword.tsx';

type Props = {
    user: User;
    setUser: Dispatch<SetStateAction<User | null>>;
};

const UserInfo = ({ user, setUser }: Props) => {
    const currentUser = useUser();

    return (
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

                <div className="ps-16 font-bold">Formits: {user.formits}</div>
            </div>

            {currentUser &&
                currentUser.username.toLowerCase() ===
                    user.username.toLowerCase() && (
                    <div className="flex gap-2 items-center justify-end">
                        <ChangeDisplayName setUser={setUser} />

                        <ChangePassword />
                    </div>
                )}
        </div>
    );
};

export default UserInfo;
