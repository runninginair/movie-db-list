import React from "react";
import styled from "styled-components";


export default function Logo(props) {
  return (
    <LogoContainer>
      <img
        src={
          "/public/moive-db-logo.svg"
          // "/public/TMDB-logo-New.svg"
        }
      />
    </LogoContainer>
  );
}

const LogoContainer = styled.div`
  width: 150px; padding: 10px 20px;
  // width: 230px; padding-left: 20px;
`;
