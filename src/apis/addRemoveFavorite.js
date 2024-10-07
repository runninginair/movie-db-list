import { API_KEY } from "../../private/API_KEY";
import { BASE_API } from "../../private/BASE_API";

/**
 * Add rating function
 * @param {number} movie_id 
 * @param {boolean} isLiked
 * @param {string} sessionID 
 * @returns {object} API response
 */
export const addRemoveFavorite = (movie_id, isLiked, sessionID) => {
  const addFavoriteAPI = `${BASE_API}/account/${movie_id}/favorite?api_key=${API_KEY}&session_id=${sessionID}`;

  return fetch(addFavoriteAPI, {
    method: 'POST', // 设置请求方法为 POST
    headers: {
      'Content-Type': 'application/json;charset=utf-8', // 设置请求头，指定发送的是 JSON 数据
    },
    body: JSON.stringify({
      "media_type": "movie",
      "media_id": movie_id,
      "favorite": !isLiked
    }),
  }).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      alert("Please login before you collect your favorite.")
      throw new Error('Failed to add favorite.');
    }
  }).catch((error) => {
    console.error('Error adding favorite:', error);
  });
};
