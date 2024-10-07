import React, { useState, useEffect } from "react";
import CategorySelect from "./CategorySelect";
import Pagination from "./Pagination";
import { MOVIE_CATEGORIES } from "../contants";
import MovieCardList from "./MovieCardList";
import { loadMoviesByCategory } from "../apis/loadMoviesByCategory";
import styled from "styled-components";


export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [category, setCategory] = useState(MOVIE_CATEGORIES.NOW_PLAYING.value);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await loadMoviesByCategory(category, currentPage);
        if (data && data.results) {
          setMovies(data.results);
          setTotalPages(data.total_pages);
        } else {
          console.error("Invalid data format received:", data);
        }
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };

    fetchMovies();
  }, [category, currentPage]);

  const handleChangeCategory = (category) => {
    setCategory(category);
    setCurrentPage(1);
  };

  return (
    <HomeContainer>
      <CategorySelect
        category={category}
        onCategoryChange={handleChangeCategory}
      />

      {/* Pagination 组件 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <MovieCardList
        movies={movies}
      /><br /><br />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </HomeContainer>
  );
}


const HomeContainer = styled.div`
  max-width: 1678px;
  margin: 0 auto;
  color: #555;
  padding: 16px;
`;
