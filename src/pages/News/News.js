import "./news.css";

import React, { useEffect, useState } from "react";
import NewsCard from "../../components/NewsCard/NewsCard.js";
import { fetchNews, getFilteredArticles } from "../../services/newsService.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import ReactPaginate from "react-paginate";
import FilterSection from "../../components/FilterSection/FilterSection.js";
import loadingGif from "../../assets/loadingGif.gif";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchNews().then(setNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchResults = async (news) => {
    setNews(news);
  };

  const handlePersonalizedFeed = async (filters) => {
    setLoading(true);
    try {
      await getFilteredArticles(filters).then(setNews);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  // Invoke when user click to request another page.
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedNews = Array.isArray(news)
    ? news.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  return (
    <div className="app-container">
      <FilterSection handlePersonalizedNewsFeed={handlePersonalizedFeed} />
      <div className="main-content">
        <SearchBar handleSearch={handleSearchResults} />

        {loading ? (
          <div class="loading-gif-container">
            <img src={loadingGif} alt="Loading" className="loading-gif" />
          </div>
        ) : paginatedNews.length > 0 ? (
          <div className="news-container">
            {paginatedNews.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={
                Array.isArray(news) ? Math.ceil(news.length / itemsPerPage) : 0
              }
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        ) : (
          <div className="no-data-msg">
            <p>No data found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
