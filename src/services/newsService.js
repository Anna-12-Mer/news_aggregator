import axios from "axios";
import { BASE_URL } from "../utils/utils";

const API_KEY = "d593ddb8948044f19574d4e5e89fc169";

export const fetchNews = async ({
  keyword = "",
  date = "",
  category = "",
  source = "bbc-news",
} = {}) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: API_KEY,
        q: keyword,
        from: date,
        to: date,
        category: category,
        sources: source,
      },
    });
    const validArticles = response.data.articles.filter(
      (article) => article.description !== null
    );

    return validArticles;
  } catch (error) {
    console.error("Error fetching News:", error);
    return [];
  }
};

// Fetch the personalized news feed based on the filters

export const getFilteredArticles = async (filters) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: API_KEY,
        sources: filters.sources.join(","),
        categories: filters.categories.join(","),
        authors: filters.authors.join(","),
      },
    });
    const validArticles = response.data.articles.filter(
      (article) => article.description !== null
    );

    return validArticles;
  } catch (error) {
    console.error("Error fetching the personalized news feed:", error);
  }
};
