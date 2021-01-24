import { useState } from "react";

function Search(props) {

    const [searchValue, setsearchValue] = useState("");

    const searchMovie = (e) => {
        setsearchValue(e.target.value);
        console.log(e.target.value);
        // props.search(searchValue);
        props.search(e.target.value);
    }

    return (
        <div className='searchbar-container'>
            <input className='searchbar' type='search' placeholder='Search...' value={searchValue} onChange={searchMovie} />
        </div>
    )
}

export default Search;