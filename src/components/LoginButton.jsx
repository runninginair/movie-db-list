import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";


const LoginContainer = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  a { 
    color: white;             
    text-decoration: none; 
  }
  a:hover {
    color: lightgreen;
    font-weight: 600;
  }
  div {
  font-size:0.8em;
  font-weight: 300;
  }
  
  div:hover {
  color: yellow;
  cursor: pointer;
  font-weight: 400;
  }
`;

export default function LoginButton() {
  const { authData, logout } = useAuth();
  const [showLogoutButton, setShowLogoutButton] = useState(false);
    // 点击用户名时触发的函数（Logout button）
    const handleUsernameClick = () => {
      setShowLogoutButton(true); // 显示按钮
    };

  return (
    <LoginContainer>
      {!authData ? (
        <Link to="/login">Login</Link>
      ) : (
        <div onClick={handleUsernameClick}>{authData.username}</div>
      )}

      {/* 如果 用户登录成功，并且showButton 为 true，则显示“Logout”按钮 */}
      {authData && showLogoutButton && (
        <button onClick={logout}>Logout</button>
      )}

    </LoginContainer>
  )
}