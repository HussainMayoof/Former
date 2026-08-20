import { usePostActions, useUser } from '../../store.ts';
import {
    BsCaretDown,
    BsCaretDownFill,
    BsCaretUp,
    BsCaretUpFill,
} from 'react-icons/bs';
import WarningAlert from '../shared/WarningAlert.tsx';
import { useState } from 'react';

interface Props {
    score: number;
    userVote?: boolean;
}

const VoteButtons = ({ score, userVote }: Props) => {
    const { votePost, unvotePost } = usePostActions();
    const user = useUser();
    const [showWarning, setShowWarning] = useState(false);

    const vote = (vote: boolean) => {
        if (!user) {
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 2000);
        }
        if (userVote === vote) {
            void unvotePost();
        } else {
            void votePost(vote);
        }
    };

    return (
        <div className="flex gap-2 items-center text-xl my-4">
            <WarningAlert
                show={showWarning}
                message="You must be logged in to do that!"
            />
            <button
                className="cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    vote(true);
                }}
            >
                {userVote === true ? (
                    <BsCaretUpFill className="fill-accent" />
                ) : (
                    <BsCaretUp className="hover:fill-accent/50 duration-100" />
                )}
            </button>

            {userVote !== undefined && userVote !== null ? (
                <p className={userVote ? 'text-accent' : 'text-error'}>
                    {score}
                </p>
            ) : (
                <p>{score}</p>
            )}
            <button
                className="cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    vote(false);
                }}
            >
                {userVote === false ? (
                    <BsCaretDownFill className="fill-error translate-y-px" />
                ) : (
                    <BsCaretDown className="hover:fill-error/50 duration-100 translate-y-px" />
                )}
            </button>
        </div>
    );
};

export default VoteButtons;
