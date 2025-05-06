import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-box">
      <FaSearch className="text-3xl" />
      <input
        type="text"
        className="search-bar"
        placeholder="Search for your favorite here..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
