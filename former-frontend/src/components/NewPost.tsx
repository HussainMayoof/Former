import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAlertActions, usePostsActions, useUser } from '../store.ts';
import type { MouseEvent, SubmitEvent } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';

const NewPost = () => {
    const user = useUser();

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);

    const [content, setContent] = useState('');
    const [newTag, setNewTag] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const { setAlert } = useAlertActions();

    const navigate = useNavigate();
    const { addPost } = usePostsActions();

    useEffect(() => {
        document.title = 'Former - New Post';
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleCreateNewTag = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newTag) {
            if (tags.includes(newTag)) return;
            if (tags.length >= 5) return;
            setTags(tags.concat(newTag));
            setNewTag('');
        }
    };

    const handleDeleteTag = (tagToDelete: string) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const handleFormSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.length < 1) return setTitleError(true);
        try {
            const post = await addPost({ title, content, tags });
            navigate(`/posts/${post.id}`, { viewTransition: true });
        } catch (e) {
            if (e instanceof Error) {
                setAlert('Error', e.message, 5000);
            }
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-4 p-12 m-6 border-2 rounded-4xl"
        >
            <div className="flex flex-col gap-2 items-center">
                <h2 className="text-2xl">New Post</h2>
                <hr className="w-full" />
            </div>

            <label className="flex flex-col gap-1">
                <span>
                    Title<span className="text-accent mx-0.5">*</span>:{' '}
                </span>

                <input
                    type="text"
                    className={`input ${titleError ? 'border-error!' : ''}`}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setTitleError(e.target.value.length < 1);
                    }}
                    onBlur={() => setTitleError(title.length < 1)}
                />

                {titleError && (
                    <span className="text-error text-sm inline-flex items-center gap-2">
                        <BsExclamationCircle className="text-error" />
                        Title is required
                    </span>
                )}
            </label>

            <label className="flex flex-col gap-1">
                Content:{' '}
                <textarea
                    className="input textarea w-full min-h-25"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </label>

            <div className="flex flex-col gap-1">
                <p>Tags:</p>
                <div className="flex items-start gap-2">
                    <div className="flex flex-col gap-1">
                        <div>
                            <input
                                type="text"
                                className="input-sm mb-1"
                                size={10}
                                maxLength={10}
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                            />
                        </div>
                        <button
                            className="btn btn-secondary btn-soft text-xs"
                            onClick={handleCreateNewTag}
                        >
                            Add New Tag
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1">
                        {tags.map((tag) => (
                            <p
                                className="bg-blue-400 hover:bg-red-700 transition-colors duration-300 rounded-sm py-1 px-1.5 text-sm text-black cursor-pointer"
                                key={tag}
                                onClick={() => handleDeleteTag(tag)}
                            >
                                {tag}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <button className="btn btn-primary" type="submit">
                Create Post
            </button>
        </form>
    );
};

export default NewPost;
