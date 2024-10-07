import { loadRatedMovies } from "./loadRatedMovies";

export const loadAllRatedMovies = async (accountID, sessionID) => {
  let allRatedMovies = [], page = 1, totalPages = 1;

  try {
    while (page <= totalPages) {
      const ratedMoviesData = await loadRatedMovies(accountID, page, sessionID);

      if (ratedMoviesData && ratedMoviesData.results) {
        allRatedMovies = [...allRatedMovies, ...ratedMoviesData.results];
        totalPages = ratedMoviesData.total_pages;  // 更新总页数
        page += 1;  // 跳到下一页
      }
    }

    // 将 movie_id 作为键、rating 作为值生成对象
    const ratedMovieIdAndRating = allRatedMovies.reduce((acc, movie) => {
      acc[movie.id] = movie.rating;
      return acc;
    }, {}); // 初始化空对象并累积结果

    // 将所有的 movie_id 和对应的 rating 存储到 localStorage 中
    localStorage.setItem('ratedMovies', JSON.stringify(ratedMovieIdAndRating));
    // console.log("All rated movies stored:", ratedMovieIdAndRating);

    return allRatedMovies; // 返回所有已评分的电影
  } catch (error) {
    console.error("Error loading all rated movies:", error);
  }
};
