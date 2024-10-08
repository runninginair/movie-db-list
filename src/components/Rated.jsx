import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { loadRatedMovies } from "../apis/loadRatedMovies";
import MovieCardList from "./MovieCardList";
import Pagination from "./Pagination";
import { PROMPT_MESSAGE } from "../contants";
import styled from "styled-components";


export default function Rated() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const { authData } = useAuth();
  const [ratedMovies, setRatedMovies] = useState([]);

  useEffect(() => {
    if (!authData) {
      return;
    }

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
      <RatedContainer>
        <h3>RATED MOVIES</h3>
        <h4>{PROMPT_MESSAGE}</h4>
      </RatedContainer>
    );
  }

  return (
    <RatedContainer>
      <h3>RATED MOVIES</h3>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <MovieCardList
        movies={ratedMovies}
      /><br /><br />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

    </RatedContainer>
  );
}


const RatedContainer = styled.div`
  text-align: center;
  max-width: 1678px;
  margin: 0 auto;
  color: #555;
  padding: 16px;

  h3 {
    font-size: 1.8em;
    color: navy;
  }

  h4 {
    font-size: 1.9em;
    font-weight: 300;
    margin-top: 160px;
    margin-bottom: 320px;
  }
`;
