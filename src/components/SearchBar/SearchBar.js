import "./searchBar.css";

import React, { useState } from "react";
import { fetchNews } from "../../services/newsService";
import { CATEGORIES, formatToSlug, SOURCES } from "../../utils/utils";

const SearchBar = ({ handleSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");

  const handleSearchClick = async () => {
    try {
      await fetchNews({ keyword, date, category, source }).then(handleSearch);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="search-input"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="date-input"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select-input"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={formatToSlug(cat)}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="select-input"
      >
        {SOURCES.map((cat) => (
          <option key={cat} value={formatToSlug(cat)}>
            {cat}
          </option>
        ))}
      </select>
      <button onClick={handleSearchClick} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
