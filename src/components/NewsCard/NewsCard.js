import "./newsCard.css";

import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="news-card">
      <div className="image-container">
        <img src={article.urlToImage} alt="news" className="news-image" />
        <div className="reading-time">
          {Math.ceil(article.content.split(" ").length / 200)} min read
        </div>
        <div className="title-author">
          <h3 className="title">{article.title}</h3>
          <p className="author">{article.author || "Unknown Author"}</p>
        </div>
      </div>
      <p className="date">
        {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <p className="description">{article.description}</p>
    </div>
  );
};

export default NewsCard;
