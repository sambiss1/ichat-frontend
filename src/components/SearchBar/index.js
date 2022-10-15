import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchBar = () => {
    return (

        <form className="search__bar">
            <BiSearch />
            <input type="seach" placeholder='Search' />
        </form>

    )
}

export default SearchBar