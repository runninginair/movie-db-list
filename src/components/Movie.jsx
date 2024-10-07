import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadMovieDetail } from "../apis/loadMovieDetail";
import UserRating from "./UserRate";
import styled from "styled-components";


export default function Movie() {
  const { movie_id } = useParams(); // 从 URL 中获取 movie_id 参数
  const [movieDetail, setMovieDetail] = useState(null); // 初始状态为 null

  // 使用 useEffect 来加载电影详情
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await loadMovieDetail(movie_id); // 使用 movie_id 获取电影详情
        setMovieDetail(data);
      } catch (error) {
        console.error("Error loading movie details:", error);
      }
    };

    if (movie_id) {
      fetchMovieDetail();
    }
  }, [movie_id]); // 当 movie_id 改变时重新执行

  // 如果 movieDetail 尚未加载，返回一个加载状态
  if (!movieDetail) {
    return <p>Loading movie details...</p>;
  }


  return (
    <SingleMovieContainer>

      <ImgContainer>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}/>
      </ImgContainer>

      <DetailsContainer>
        <MovieTitle>{movieDetail.title}</MovieTitle>
        <br />

        <SectionTitle>Release date: </SectionTitle>
        <Overview>{movieDetail.release_date}</Overview>
        <br />

        <SectionTitle>Overview: </SectionTitle>
        <Overview>{movieDetail.overview}</Overview>
        <br />

        <SectionTitle>Genres</SectionTitle>
        <Container>
          {movieDetail.genres.map((gen) =>
            <GenreItem key={gen.id}>{gen.name}</GenreItem>)}
        </Container><br />

        <SectionTitle>Average Rating:</SectionTitle>
        <i className="icon ion-md-star rating-icon"></i>
        <span>{movieDetail.vote_average}</span><br /><br />

        <SectionTitle>Your Rating: <UserRating movie_id={movie_id}/></SectionTitle><br />

        <SectionTitle>Production Companies:</SectionTitle>
        <Container>
          {movieDetail.production_companies
            .map((com) =>
              <ProductionItem key={com.id || com.name}>
                <img src={`https://image.tmdb.org/t/p/w500${com.logo_path}`} />
              </ProductionItem>)
          }
        </Container>
      </DetailsContainer>

    </SingleMovieContainer>
  )
}



const SingleMovieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 16px;
  margin: 20px 120px;

  i {
    font-size: 1.2rem;
    color: #f5c518;
    margin-right: 0.5rem;
    cursor: default;
  }
`;

const ImgContainer = styled.div`
  width: 35%;
  max-height: 600px;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 图片裁剪适应容器，保持长宽比 */
  }
`;

const DetailsContainer = styled.div`
  flex-grow: ;
  margin-left: 2rem;
`;

const MovieTitle = styled.div`
  margin: 0px;
  font-size: 2rem;
`;

const SectionTitle = styled.h3`
  margin: 0.3rem 0px;
`;

const Overview = styled.div`
  max-height: 100px;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GenreItem = styled.div`
  padding: 0.5rem 1rem;
  background-color: #90cea1;
  margin-left: 1rem;
  color: white;
  border-radius: 15px;
  &:first-child {
    margin-left: 0;
  }
`;

const ProductionItem = styled.div`
  width: 50px;
  margin-right: 1rem;
  img {
    width: 100%;
    height: 65%;
    object-fit: cover;
  }
`;



