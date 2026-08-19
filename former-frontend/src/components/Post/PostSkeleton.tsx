const PostSkeleton = () => (
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

export default PostSkeleton;
