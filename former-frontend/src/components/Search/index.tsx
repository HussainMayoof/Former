import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { searchPost } from '../../services/PostService.ts';
import PostsBody from '../Posts/PostsBody.tsx';
import type { Post } from '../../types.ts';
import SearchBar from './SearchBar.tsx';

const Search = () => {
    const { query } = useParams();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            if (query) setPosts(await searchPost(query));
        };

        void getPosts();
    }, [query]);

    if (!query) {
        return <SearchBar />;
    }

    return (
        <div>
            <SearchBar />
            {posts.length > 0 ? (
                <PostsBody posts={posts} loading={false} />
            ) : (
                <p className="text-center">No results found</p>
            )}
        </div>
    );
};

export default Search;
