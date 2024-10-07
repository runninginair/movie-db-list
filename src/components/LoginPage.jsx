import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Button from './Button';
import styled from 'styled-components';
import { loginUser } from '../apis/authService';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();


  return (
    <LoginContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // 阻止表单默认行为，以免页面刷新
          if (username && password) {
            loginUser(username, password, login, navigate, setLoading, setLoginFailed);
          }
        }}
      >
        <h1>Login</h1>

        <p
          className="FailAlarm"
          style={{ visibility: loginFailed ? 'visible' : 'hidden' }}>
          Fail to Login
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <Button type="submit">
          SUBMIT
        </Button>
        <br /><br /><br />
      </form>
    </LoginContainer>

  );
}

const LoginContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    background-color: #f0f0f0;
    padding: 2rem;
  }

  h1 {
    font-size: 70px;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  .FailAlarm {
    color: red;
    visibility: hidden; /* 默认隐藏 */
  }

  input {
    margin: 0.5rem 0;
    padding: 0.5rem;
    width: 400px;
    font-size: 1rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .returnButton {
    background-color: lightgray;
    margin-top: 1rem;
  }
`;

