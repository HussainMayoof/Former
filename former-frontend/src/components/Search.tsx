import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import { type SubmitEvent, useState } from 'react';

const Search = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/search/${search}`);
    };

    return (
        <form className="flex items-center" onSubmit={handleSearch}>
            <label className="input m-8 w-full">
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

export default Search;
