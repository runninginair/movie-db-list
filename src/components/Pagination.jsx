import React from "react";
import styled from "styled-components";
import Button from "./Button";


export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage, // 接收 setCurrentPage 函数作为 prop
}) {
  // 内部处理页码变化逻辑
  const onPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      window.alert("It's already the first page.");
    }
  };

  const onNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      window.alert("It's already the last page.");
    }
  };

  return (
    <PaginationContainer>
      <Button onClick={onPrev}>Prev</Button>
      <p>
        {currentPage} / {totalPages}
      </p>
      <Button onClick={onNext}>Next</Button>
    </PaginationContainer>
  );
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  margin: 1rem auto;
`;

