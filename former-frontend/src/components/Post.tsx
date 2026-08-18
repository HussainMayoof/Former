import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getPost } from '../services/PostService.ts';
import type { PostWithUserAndTags } from '../types.ts';

const Post = () => {
    const id = useParams().id;
    const [post, setPost] = useState<PostWithUserAndTags>();

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                setPost(await getPost(id));
            }
        };

        fetchPost();
    }, [id]);

    useEffect(() => {
        if (post?.title) {
            document.title = `Former - ${post.title}`;
        }
    }, [post?.title]);

    if (!id) return null;

    if (!post)
        return (
            <div className="p-12 m-6 border-2 rounded-4xl flex-1 flex flex-col h-full">
                <div className="skeleton h-4.5 w-1/8"></div>
                <div className="flex gap-2 my-2">
                    <div className="skeleton rounded-sm py-1 px-1.5 h-5 w-1/40"></div>
                    <div className="skeleton rounded-sm py-1 px-1.5 h-5 w-1/40"></div>
                    <div className="skeleton rounded-sm py-1 px-1.5 h-5 w-1/40"></div>
                    <div className="skeleton rounded-sm py-1 px-1.5 h-5 w-1/40"></div>
                    <div className="skeleton rounded-sm py-1 px-1.5 h-5 w-1/40"></div>
                </div>

                <div className="flex gap-2 items-center">
                    <div className="avatar avatar-placeholder cursor-pointer">
                        <div className="skeleton w-6 rounded-full"></div>
                    </div>

                    <div className="skeleton h-3 w-1/16"></div>
                </div>

                <hr className="text-base-300 my-2" />

                <div className="skeleton flex-1 w-full"></div>
            </div>
        );

    return (
        <div className="p-12 m-6 border-2 rounded-4xl flex-1">
            <p className="font-semibold text-lg">{post.title}</p>
            {post.tags && (
                <div className="flex gap-2 my-2">
                    {post.tags.map((tag) => (
                        <Link
                            to={`/tags/${tag.tagName}`}
                            key={tag.tagName}
                            className="bg-blue-400 hover:bg-blue-500 transition-colors duration-300 rounded-sm py-1 px-1.5 text-sm text-black"
                            viewTransition
                        >
                            {tag.tagName}
                        </Link>
                    ))}
                </div>
            )}

            <div className="font-thin text-sm mb-2 ">
                <Link
                    to={`/users/${post.userId}`}
                    className="group w-fit hover:text-tertiary-content duration-200 items-center flex gap-0.5"
                    viewTransition
                >
                    <div className="avatar avatar-placeholder cursor-pointer">
                        <div className="bg-neutral text-neutral-content w-6 rounded-full">
                            <span className="text-md">
                                {post.user.displayName[0].toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <p className="font-medium duration-200">
                        {post.user.displayName}
                        <span
                            className={`block max-w-0 -mt-0.5 group-hover:max-w-full duration-200 h-px bg-tertiary-content`}
                        ></span>
                    </p>
                </Link>
            </div>
            <hr />

            <p className="mt-2">{post.content}</p>
        </div>
    );
};

export default Post;
