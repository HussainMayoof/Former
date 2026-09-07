import { BsSearch } from 'react-icons/bs';
import { type SubmitEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const SearchBar = () => {
    const { query } = useParams();
    const navigate = useNavigate();

    const [search, setSearch] = useState(query || '');

    const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/search/${search}`);
    };

    return (
        <form className="flex items-center" onSubmit={handleSearch}>
            <label className="input m-8 w-full h-14">
                <button type="submit" className="cursor-pointer">
                    <BsSearch />
                </button>
                <input
                    type="search"
                    className="grow"
                    placeholder="Search"
                    value={search}
                    onChange={({ target }) => setSearch(target.value)}
                />
            </label>
        </form>
    );
};

export default SearchBar;
