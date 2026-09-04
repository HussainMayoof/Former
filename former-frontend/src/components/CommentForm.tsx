import { useState } from 'react';
import { useAlertActions } from '../store.ts';
import type { SubmitEvent } from 'react';
import { createComment } from '../services/CommentService.ts';
import type { CommentWithChildren } from '../types.ts';
import { BsSend } from 'react-icons/bs';

type Props = {
    newComment: (comment: CommentWithChildren) => void;
    shown: boolean;
    setShown: (shown: boolean) => void;
    postId: string;
    commentId?: number;
};

const CommentForm = ({
    newComment,
    shown,
    setShown,
    postId,
    commentId,
}: Props) => {
    const [content, setContent] = useState('');

    const { setAlert } = useAlertActions();

    const handleFormSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (content.length < 1) return;
        try {
            const comment = await createComment(content, postId, commentId);
            newComment(comment);
            setShown(false);
            setContent('');
        } catch (e) {
            if (e instanceof Error) {
                setAlert('Error', e.message, 5000);
            }
        }
    };

    if (!shown) return null;

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex mb-4 p-4 gap-4 items-stretch"
        >
            <textarea
                className="input textarea w-full min-h-24"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Comment..."
            />

            <div>
                <button className="btn btn-info text-xs h-full" type="submit">
                    <BsSend className="hover:fill-info" />
                </button>
            </div>
        </form>
    );
};

export default CommentForm;
