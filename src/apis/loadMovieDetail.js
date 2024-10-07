import { API_KEY } from "../../private/API_KEY";
import { BASE_API } from "../../private/BASE_API";

/**
 * API function to load a movie's detail
 * @param {number} movieId
 * @returns {object}
 */
export const loadMovieDetail = async (movieId) => {
  const url = `${BASE_API}/movie/${movieId}?api_key=${API_KEY}`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`Failed to fetch movies: ${resp.statusText}`);
    }
    const data = await resp.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error in loadMoviesByCategory:", error);
    throw error;
  }
}
