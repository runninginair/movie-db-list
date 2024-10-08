import React from "react";
import { MOVIE_CATEGORIES } from "../contants";
import styled from "styled-components";


export default function CategorySelect({ category, onCategoryChange }) {
  const handleChange = (e) => {
    console.log(e.target.value);
    onCategoryChange(e.target.value);
  };
  return (
    <GategoryContainer>
      <p>Category </p>
      <select value={category} onChange={handleChange}>
        {Object.values(MOVIE_CATEGORIES).map((category) => {
          return (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          );
        })}
      </select>
    </GategoryContainer>
  );
}

const GategoryContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: rgb(245, 255, 255);
  color: navy;
  padding: 2px 23px;
  column-gap: 10px;

  select {
    width: 180px;
    height: 40px;
    font-size: 1.2rem;
    background-color: lightyellow;
    border-radius: 18px;
    padding-left: 12px;
    cursor: pointer;
  }
  p {
    font-size: 1.4rem;
  }
`;