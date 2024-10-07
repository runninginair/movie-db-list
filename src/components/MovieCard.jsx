import React from "react";
import styled from "styled-components";
import { addRemoveFavorite } from "../apis/addRemoveFavorite";
import { useAuth } from "./AuthContext";


export default function MovieCard({
  movie,
  liked,
  onToggleLike,
  onTitleClick,
}) {
  const { authData } = useAuth();

  return (
    <MovieCardContainer>
      <div className="movie-card-img">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
      </div>

      {/* Movie title with onClick listener to movie details */}
      <h4 className="movie-card-title" onClick={() => onTitleClick(movie.id)}>
        {movie.title}
      </h4>

      <div className="movie-card-rating">
        <div className="rating">
          <i className="icon ion-md-star rating-icon"></i>
          <span>{movie.vote_average.toFixed(1)}</span>
          {movie.rating && (<span>&nbsp;/&nbsp;{movie.rating}</span>)}
        </div>

        <div onClick={() => {
          if (!authData || !authData.sessionId) {
            alert(" Please login and then add the movie to your favorite. \n Thanks for your understanding and collaboration!");
            return; // 停止执行，防止 onToggleLike 被调用
          }
          onToggleLike(movie.id);
          addRemoveFavorite(movie.id, liked, authData.sessionId); // 调用 API 更新用户喜欢的电影
        }}>
          <i
            className={`like-icon icon ${liked ? "ion-md-heart" : "ion-md-heart-empty"}`}
          ></i>
        </div>
      </div>
    </MovieCardContainer>
  );
}


const MovieCardContainer = styled.div`
  border-radius: 7px;
  text-align: center;
  box-shadow: 0 2px 10px 2px rgba(0, 55, 0, 0.5);
  
  .movie-card-img img {
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    width: 100%;
  }

  .movie-card-title {
    font-size: 1.2rem;
    margin: 1rem 0;
    cursor: pointer;
  }
  .movie-card-title:hover {
    color: #90cea1;
  }

  .movie-card-rating {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
  }

  .movie-card-rating .icon {
    font-size: 1.5rem;
  }

  .movie-card-rating .rating {
    display: flex;
    align-items: center;
  }

  .movie-card-rating .icon.ion-md-heart-empty {
    cursor: pointer;
  }

  .movie-card-rating .icon.ion-md-heart {
    cursor: pointer;
    color: red;
  }

  .movie-card-rating .icon.rating-icon {
    color: #f5c518;
    margin-right: 0.5rem;
    cursor: default;
  }
`;
