import { useState } from "react";

function Search(props) {
  const [searchValue, setsearchValue] = useState("");

  //   const handleValueChange = (e) => {
  //       setsearchValue(e.target.value);
  //   }

  const searchMovie = (e) => {
    e.preventDefault();

    props.search(searchValue);
    setsearchValue("");
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={searchMovie}>
        <input
          id="input"
          className="searchbar"
          type="input"
          placeholder="Search for your favorite movies"
          value={searchValue}
          onChange={(e) => setsearchValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Search;
