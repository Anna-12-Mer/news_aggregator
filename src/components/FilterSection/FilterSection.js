import "./filterSection.css";

import { AUTHORS, CATEGORIES, formatToSlug, SOURCES } from "../../utils/utils";
import React, { useState, useCallback } from "react";

const FilterBlock = ({ title, data, setData }) => {
  const handleDataChange = useCallback(
    (event) => {
      const { name, checked } = event.target;
      setData((prevSelected) =>
        checked
          ? [...prevSelected, formatToSlug(name)]
          : prevSelected.filter((item) => item !== name)
      );
    },
    [setData]
  );

  return (
    <div className="filter-block">
      <h3>{title}</h3>
      {data.map((item, index) => (
        <label className="filter-checkbox" key={index}>
          <input
            type="checkbox"
            name={item.toLowerCase()}
            onChange={handleDataChange}
          />
          {item}
        </label>
      ))}
    </div>
  );
};

const FilterSection = ({ handlePersonalizedNewsFeed }) => {
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const handlePersonalizedFeedClick = useCallback(() => {
    const filters = {
      sources: selectedSources,
      categories: selectedCategories,
      authors: selectedAuthors,
    };
    handlePersonalizedNewsFeed(filters);
  }, [
    selectedSources,
    selectedCategories,
    selectedAuthors,
    handlePersonalizedNewsFeed,
  ]);
  const filterBlocs = [
    {
      label: "Sources",
      data: SOURCES,
      setData: setSelectedSources,
    },
    {
      label: "Categories",
      data: CATEGORIES,
      setData: setSelectedCategories,
    },
    {
      label: "Authors",
      data: AUTHORS,
      setData: setSelectedAuthors,
    },
  ];

  return (
    <aside className="personalized-feed">
      <h2>Personalized News Feed</h2>
      <p>Select your preferred sources, categories, and authors:</p>
      <div className="filter-options">
        {filterBlocs.map((block, index) => (
          <FilterBlock
            key={index}
            title={block.label}
            data={block.data}
            setData={block.setData}
          />
        ))}
      </div>
      <button onClick={handlePersonalizedFeedClick} className="search-button">
        Personalized Feed
      </button>
    </aside>
  );
};

export default FilterSection;
