import { usePostActions } from '../../store.ts';
import {
    BsCaretDown,
    BsCaretDownFill,
    BsCaretUp,
    BsCaretUpFill,
} from 'react-icons/bs';

interface Props {
    score: number;
    userVote?: boolean;
}

const VoteButtons = ({ score, userVote }: Props) => {
    const { votePost, unvotePost } = usePostActions();

    const vote = (vote: boolean) => {
        if (userVote === vote) {
            void unvotePost();
        } else {
            void votePost(vote);
        }
    };

    return (
        <div className="flex gap-2 items-center text-xl my-4">
            <button className="cursor-pointer" onClick={() => vote(true)}>
                {userVote === true ? (
                    <BsCaretUpFill className="fill-accent" />
                ) : (
                    <BsCaretUp />
                )}
            </button>

            {userVote !== undefined && userVote !== null ? (
                <p className={userVote ? 'text-accent' : 'text-error'}>
                    {score}
                </p>
            ) : (
                <p>{score}</p>
            )}
            <button className="cursor-pointer" onClick={() => vote(false)}>
                {userVote === false ? (
                    <BsCaretDownFill className="fill-error translate-y-px" />
                ) : (
                    <BsCaretDown className="translate-y-px" />
                )}
            </button>
        </div>
    );
};

export default VoteButtons;
