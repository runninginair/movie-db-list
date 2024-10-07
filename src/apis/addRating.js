import { API_KEY } from "../../private/API_KEY";
import { BASE_API } from "../../private/BASE_API";

/**
 * Add rating function
 * @param { number } movie_id 
 * @param { number } value 
 * @param { string } sessionID 
 * @returns { object } API response
 */
export const addRating = (movie_id, value, sessionID) => {
  let addRatingAPI = "";
  if (sessionID === null) {
    addRatingAPI = `${BASE_API}/movie/${movie_id}/rating?api_key=${API_KEY}`;
  }
  else {
    addRatingAPI = `${BASE_API}/movie/${movie_id}/rating?api_key=${API_KEY}&session_id=${sessionID}`;
  }

  return fetch(addRatingAPI, {
    method: 'POST', // 设置请求方法为 POST
    headers: {
      'Content-Type': 'application/json;charset=utf-8', // 设置请求头，指定发送的是 JSON 数据
    },
    body: JSON.stringify({ "value": value }),
  }).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      alert("Please login before you submit your rating.")
      throw new Error('Failed to add rating');
    }
  }).catch((error) => {
    console.error('Error adding rating:', error);
  });
};
