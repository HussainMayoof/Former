const PostCardSkeleton = () => (
    <>
        <div className="flex w-3/4 flex-col gap-1">
            <div className="skeleton h-3.5 w-1/16"></div>
            <div className="skeleton h-5 w-1/4"></div>
            <div className="skeleton h-[5em] w-full"></div>
        </div>

        <hr className="min-w-3/4 my-1 text-base-300" />
    </>
);

export default PostCardSkeleton;
