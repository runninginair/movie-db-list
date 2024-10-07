import React from "react";
import styled from "styled-components";


export default function () {
  return (
    <FootContainer>
      <footer>
        <p>
          <span> © Copyright Reserved. </span>
          <span> Author: Jin Zhang | Email: </span>
          <a href="mailto:zhang.jin.wa@outlook.com">
            zhang.jin.wa@outlook.com
          </a>
        </p>
      </footer>
    </FootContainer>
  );
}

const FootContainer = styled.footer`
  display: flex;
  flex-direction: column; /* 改为列方向 */
  justify-content: center; /* 垂直方向居中 */
  align-items: center;
  background-color: gray;
  color: white;
  font-size: 10px;
  margin-top: 30px;
`;