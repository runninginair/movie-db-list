import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Tabs from "./Tabs";
import LoginButton from "./LoginButton";


export default function Header({ activeTab, onTabChange }) {
  return (
    <HeaderContainer>
      {/* The movie DB logo */}
      <Logo />

      {/* The HOME, FAVORITE, RATED nav*/}
      <Tabs activeTab={activeTab} onTabChange={onTabChange} />
      
      {/* Login / Logout button */}
      <div className="login">
        <LoginButton />
      </div>
    </HeaderContainer>
  );
}


const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  background-color: #033067;
  color: white;
  
  .login {
    haver: pointer;
    margin-left: auto;
    margin-right: 40px;
  }
`;