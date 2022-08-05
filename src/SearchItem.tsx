import React from 'react';
import { FC } from 'react';

type ISearchItemProps = {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
};

const SearchItem:FC<ISearchItemProps> = ({ search, setSearch }) => {
    return (
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='searchForm'>Search here</label>
            <input
                autoFocus
                id='searchForm'
                type='text'
                placeholder='搜索'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    )
};

export default SearchItem;