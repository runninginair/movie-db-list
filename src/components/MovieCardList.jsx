import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import styled from "styled-components";
import MovieCard from "./MovieCard";


export default function MovieCardList({ movies }) {
  const [likedMovies, setLikedMovies] = useState([]);
  const { authData } = useAuth();
  const navigate = useNavigate();

  // 从 localStorage 加载 liked movies
  useEffect(() => {
    if (authData) { // 只有登录状态下才从 localStorage 获取喜欢的电影
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
      setLikedMovies(storedFavorites);
    } else {
      setLikedMovies([]); // 如果未登录，设置 likedMovies 为空
    }
  }, [authData]); // 当登录状态改变时重新执行

  const handleToggleLike = (movieId) => {
    const isLiked = likedMovies.includes(movieId);
    let updatedLikedMovies;

    if (isLiked) {
      // 如果电影已经被喜欢，则移除
      updatedLikedMovies = likedMovies.filter((id) => id !== movieId);
    } else {
      // 如果电影尚未被喜欢，则添加
      updatedLikedMovies = [...likedMovies, movieId];
    }

    // 更新 localStorage
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedLikedMovies));
    // 更新组件状态
    setLikedMovies(updatedLikedMovies);
  };

  const handleTitleClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <ListContainer>
      {movies.map((movie) => {
        const liked = likedMovies.includes(movie.id);
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            liked={liked}
            onToggleLike={() => handleToggleLike(movie.id)}
            onTitleClick={() => handleTitleClick(movie.id)}
          />
        );
      })}
    </ListContainer>
  );
}


const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
`;

