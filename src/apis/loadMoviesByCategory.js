import { MOVIE_CATEGORIES } from "../contants";
import { API_KEY } from "../../private/API_KEY";
import { BASE_API } from "../../private/BASE_API";

/**
 * API function to load movies by category with proper error handling
 * @param {string} category 
 * @param {number} page 
 * @returns {object} // Movies collection
 */
export const loadMoviesByCategory = async (category, page) => {
  // Check the Cache first, if data in localStorage, then return the data.
  const CACHE_KEY = category + page;
  // 从缓存加载数据
  const loadFromCache = () => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  };

  const categoryUrlMapping = {
    [MOVIE_CATEGORIES.NOW_PLAYING.value]: "now_playing",
    [MOVIE_CATEGORIES.POPULAR.value]: "popular",
    [MOVIE_CATEGORIES.TOP_RATED.value]: "top_rated",
    [MOVIE_CATEGORIES.UPCOMING.value]: "upcoming",
  };

  const url = `${BASE_API}/movie/${categoryUrlMapping[category]}?api_key=${API_KEY}&page=${page}`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      // If the response status is not ok, throw an error with the status
      throw new Error(`Failed to fetch movies: ${resp.statusText}`);
    }
    const data = await resp.json(); // Parse the response body
    // console.log(data);
    // Save the data to cache.
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    return data;
  } catch (error) {
    // Catch and log any errors that occur during fetch or parsing
    console.error("Error in loadMoviesByCategory:", error);
    throw error; // Re-throw the error to be caught in the calling function
  }
};
