import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Movie from "./components/Movie";
import Favorite from "./components/Favorite";
import Rated from "./components/Rated";
import { AuthProvider } from "./components/AuthContext";
import { TABS } from "./contants";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "./styles.css";


const AppContainer = styled.div`
  max-width: 1678px;
  margin: 0 auto;
  color: #555;
  padding: 16px;
`;

export default function App() {

  const [activeTab, setActiveTab] = useState(TABS.HOME);

  return (
    <AppContainer>
      <AuthProvider>

        <Header
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/rated" element={<Rated />} />
          {/* 定义动态 movie_id 参数 */}
          <Route path="/movies/:movie_id" element={<Movie />} />
        </Routes>

        <Footer />

      </AuthProvider>
    </AppContainer>
  );
}
