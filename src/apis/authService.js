import { API_KEY } from "../../private/API_KEY";
import { BASE_API } from "../../private/BASE_API";
import { loadAllFavoriteMovies } from "./loadAllFavoriteMovies";
import { loadAllRatedMovies } from "./loadAllRatedMovies";

export const loginUser = async (inputUsername, inputPassword, login, navigate, setLoading, setLoginFailed) => {
  const BASE_AUTH_API = `${BASE_API}/authentication`;

  try {
    setLoading(true);

    const getTokenURL = `${BASE_AUTH_API}/token/new?api_key=${API_KEY}`;
    const validateTokenURL = `${BASE_AUTH_API}/token/validate_with_login?api_key=${API_KEY}`;
    const createSessionIdURL = `${BASE_AUTH_API}/session/new?api_key=${API_KEY}`;

    // Step-1: Get request_token
    const tokenResponse = await fetch(getTokenURL);
    if (!tokenResponse.ok) {
      throw new Error('Failed to get request token');
    }
    const { request_token } = await tokenResponse.json();

    // Step-2: Validate the request_token
    const validateTokenResponse = await fetch(validateTokenURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        username: inputUsername,
        password: inputPassword,
        request_token: request_token,
      }),
    });

    if (!validateTokenResponse.ok) {
      setLoginFailed(true);
      throw new Error('Invalid login credentials');
    }

    // Step-3: Create the session ID
    const sessionResponse = await fetch(createSessionIdURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        "request_token": request_token,
      })
    });

    if (!sessionResponse.ok) {
      throw new Error('Failed to create session');
    }

    const sessionData = await sessionResponse.json();
    const { session_id } = sessionData;

    // Step-4: Get account info
    const getAccountURL = `${BASE_API}/account?session_id=${session_id}&api_key=${API_KEY}`;
    const accountResponse = await fetch(getAccountURL);
    if (!accountResponse.ok) {
      throw new Error('Failed to get account information');
    }

    const accountData = await accountResponse.json();
    const { id, username } = accountData;
    // console.log(id, username, session_id);
    login(id, username, session_id);


    // Step-5: Load favorite movies' id and save them to localStorage 
    const favoriteMoviesData = await loadAllFavoriteMovies(id, session_id);

    if (favoriteMoviesData && favoriteMoviesData.results) {
      const favoriteMovieIds = favoriteMoviesData.results.map(movie => movie.id);

      // Save favorite movie ids to localStorage
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovieIds));
      // console.log("Favorite movies stored:", favoriteMovieIds);
    }

    // Step-6: Load rated movies' id and rating pair then save them to localStorage 
    const ratedMoviesData = await loadAllRatedMovies(id, session_id);
    // 提取 movie_id 和 rating 作为 key/value pair 存储在 localStorage 中
    if (ratedMoviesData && ratedMoviesData.length > 0) {
      const ratedMovies = {};
      ratedMoviesData.forEach(movie => {
        ratedMovies[movie.id] = movie.rating; // 将 movie_id 和 rating 存储在 ratedMovies 对象中
      });
      localStorage.setItem('ratedMoviesData', JSON.stringify(ratedMovies));
    }


    navigate("/"); // 导航到首页

    setLoading(false);

  } catch (e) {
    console.error('Login error:', e);
    setLoading(false);
    setLoginFailed(true);
    alert("Please double-check your Username and Password.");
  }
};
