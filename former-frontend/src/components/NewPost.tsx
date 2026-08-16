import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { usePostsActions } from '../store.ts';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [newTag, setNewTag] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<Error>();

    const navigate = useNavigate();
    const { addPost } = usePostsActions();

    useEffect(() => {
        document.title = 'Former - New Post';
    }, []);

    const handleCreateNewTag = (e: React.MouseEvent<HTMLButtonElement>) => {
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

    const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const post = await addPost({ title, content, tags });
            navigate(`/posts/${post.id}`, { viewTransition: true });
        } catch (e) {
            if (e instanceof Error) {
                setError(e);
            }
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex flex-col items-stretch gap-4 p-12 m-6 border-2 rounded-4xl"
        >
            {error && <p>{error.message}</p>}

            <label className="flex flex-col gap-1">
                <span>
                    Title<span className="text-red-500 mx-0.5">*</span>:{' '}
                </span>
                <input
                    type="text"
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <label className="flex flex-col gap-1">
                Content:{' '}
                <textarea
                    className="input textarea w-full min-h-[100px]"
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
