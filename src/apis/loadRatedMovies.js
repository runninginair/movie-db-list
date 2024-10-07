import { API_KEY } from "../../private/API_KEY";
import { BASE_API } from "../../private/BASE_API";

/**
 * API function to load rated movies
 * @param {number} accountID 
 * @param {number} page 
 * @param {string} sessionID 
 * @returns {object}
 */
export const loadRatedMovies = async (accountID, page, sessionID) => {
  const url = `${BASE_API}/account/${accountID}/rated/movies?language=en-US&page=${page}&session_id=${sessionID}&sort_by=created_at.asc&api_key=${API_KEY}`;

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
