import React from "react";
import styled from "styled-components";


export default function () {
  return (
    <FootContainer>
      <footer>
        <p>
          <span> © Copyright Reserved. </span>
          <span> Author: Jin Z. | Email: </span>
          <a href="mailto:runninginair@gmail.com">
            Runninginair@G-mail
          </a>
        </p>
      </footer>
    </FootContainer>
  );
}

const FootContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: lightgray;
  font-size: 12px;
  padding: 12px;
  margin-top: 30px;

  background: 
    linear-gradient(to top, navy, lightgreen),
    linear-gradient(to bottom, navy, green),
    linear-gradient(to left, navy, lightyellow),
    linear-gradient(to right, navy, yellow);
  a {
    color: lightgray;
  }
`;