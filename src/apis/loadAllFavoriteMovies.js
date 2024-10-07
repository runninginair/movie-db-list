import { loadFavoriteMovies } from "./loadFavoriteMovies";

export const loadAllFavoriteMovies = async (accountID, sessionID) => {
  let allFavoriteMovies = [], page = 1, totalPages = 1;

  try {
    while (page <= totalPages) {
      const favoriteMoviesData = await loadFavoriteMovies(accountID, page, sessionID);

      if (favoriteMoviesData && favoriteMoviesData.results) {
        allFavoriteMovies = [...allFavoriteMovies, ...favoriteMoviesData.results];
        totalPages = favoriteMoviesData.total_pages;  // Update total pages
        page += 1;  // Move to the next page
      }
    }

    // Extract only the movie IDs
    const favoriteMovieIds = allFavoriteMovies.map(movie => movie.id);

    // Save all favorite movie ids to localStorage
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovieIds));
    // console.log("All favorite movies stored:", favoriteMovieIds);
  } catch (error) {
    console.error("Error loading all favorite movies:", error);
  }
};
