import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { loadFavoriteMovies } from "../apis/loadFavoriteMovies";
import MovieCardList from "./MovieCardList";
import Pagination from "./Pagination";
import styled from "styled-components";


export default function Favorite() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const { authData } = useAuth();
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (!authData) {
      return;
    }
    // 如果 authData 存在，进行电影数据加载
    const fetchMovies = async () => {
      try {
        const data = await loadFavoriteMovies(authData.userId, currentPage, authData.sessionId);
        setFavoriteMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error loading favorite movies:", error);
      }
    };
    fetchMovies();
  }, [authData, currentPage]);

  // 如果 authData 为空，提示用户登录
  if (!authData) {
    return (
      <FavorContainer>
        <h3>FAVORITE MOVIES</h3>
        <h4>Please login to get more information.</h4>
      </FavorContainer>
    );
  }

  return (
    <FavorContainer>
      <h3>FAVORITE MOVIES</h3>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <MovieCardList 
        movies={favoriteMovies} 
      /><br /><br />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

    </FavorContainer>
  );
}

const FavorContainer = styled.div`
  text-align: center;
  max-width: 1678px;
  margin: 0 auto;
  color: #555;
  padding: 16px;

  h3 {
    font-size: 1.8em;
    color: navy;
  }
`;
