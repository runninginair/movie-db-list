import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// 创建 AuthContext
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(null);
  const navigate = useNavigate();

  const login = (userId, username, sessionId) => {
    setAuthData({ userId, username, sessionId });
  };

  const logout = () => {
    setAuthData(null);
    alert("You've successfully logged out.");
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 使用 AuthContext 的钩子
export const useAuth = () => useContext(AuthContext);
