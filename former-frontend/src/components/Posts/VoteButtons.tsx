import { useAlertActions, usePostsActions, useUser } from '../../store.ts';
import {
    BsCaretDown,
    BsCaretDownFill,
    BsCaretUp,
    BsCaretUpFill,
} from 'react-icons/bs';

interface Props {
    id: string;
    score: number;
    userVote?: boolean;
}

const VoteButtons = ({ id, score, userVote }: Props) => {
    const { votePost, unvotePost } = usePostsActions();
    const user = useUser();

    const { setAlert } = useAlertActions();

    const vote = (vote: boolean) => {
        if (!user) {
            setAlert('Warning', 'You must be logged in to do that!', 2000);
        }
        if (userVote === vote) {
            void unvotePost(id);
        } else {
            void votePost(id, vote);
        }
    };

    return (
        <div className="flex flex-col items-center text-xl my-2">
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
