import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { loadRatedMovies } from "../apis/loadRatedMovies";
import MovieCardList from "./MovieCardList";
import Pagination from "./Pagination";
import styled from "styled-components";


export default function Rated() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const { authData } = useAuth();
  const [ratedMovies, setRatedMovies] = useState([]);
  const navigate = useNavigate(); // 在组件顶层声明 useNavigate

  useEffect(() => {
    // 如果 authData 不存在，提前返回
    if (!authData) {
      // console.log("Auth data is null, skipping movie fetch.");
      return;
    }

    // 如果 authData 存在，进行电影数据加载
    const fetchMovies = async () => {
      try {
        const data = await loadRatedMovies(authData.userId, currentPage, authData.sessionId);
        setRatedMovies(data.results);
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
        <h3>RATED MOVIES</h3>
        <h4>Please login to get more information.</h4>
      </FavorContainer>
    );
  }

  const handleTitleClick = (movieId) => {
    // 动态构建 URL，并导航到电影详情页面
    navigate(`/movie/${movieId}`);
  };

  return (
    <FavorContainer>
      <h3>RATED MOVIES</h3>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <MovieCardList
        movies={ratedMovies}
        likedMovies={ratedMovies}
        onTitleClick={handleTitleClick}
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
