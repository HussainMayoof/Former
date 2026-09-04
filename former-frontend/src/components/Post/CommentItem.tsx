import type { CommentWithChildren } from '../../types.ts';
import { useState } from 'react';
import UnderlinedLink from '../shared/UnderlinedLink.tsx';

type Props = {
    comment: CommentWithChildren;
};

const CommentItem = ({ comment }: Props) => {
    const [collapsed, setCollapsed] = useState(false);

    if (collapsed)
        return (
            <div className="flex -ms-2 m-2 bg-base-200 rounded-lg items-center">
                <div
                    className="divider divider-primary px-2 cursor-pointer hover:divider-accent w-12 align-top"
                    onClick={() => setCollapsed(false)}
                ></div>
                <div className="mb-1">
                    <UnderlinedLink to={`/users/${comment.userId}`}>
                        <p className="text-xs font-semibold mb-0.5">
                            {comment.user.displayName}
                        </p>
                    </UnderlinedLink>
                </div>
            </div>
        );

    return (
        <div className="flex -ms-2 -ps-2 m-2 pb-2 bg-base-200 rounded-lg">
            <div
                className="divider divider-primary divider-horizontal ms-1 py-2 cursor-pointer hover:divider-accent"
                onClick={() => setCollapsed(true)}
            ></div>
            <div className="-ms-2 p-2">
                <div>
                    <UnderlinedLink to={`/users/${comment.userId}`}>
                        <p className="text-xs font-semibold mb-0.5">
                            {comment.user.displayName}
                        </p>
                    </UnderlinedLink>
                </div>
                {comment.content}
                {comment.childComments.map((child) => (
                    <div key={child.id} className="mt-4">
                        <CommentItem comment={child} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentItem;
