import React, { useEffect } from "react";
import styled from "styled-components";
import Tab from "./Tab";
import { TABS } from "../contants";
import { Link, useLocation } from "react-router-dom";


export default function Tabs({ activeTab, onTabChange }) {
  const location = useLocation(); // 获取当前的路由信息

  // 监听路由变化并更新 activeTab
  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath === '/') {
      onTabChange(TABS.HOME); // 如果是 HOME 页面，设置 activeTab 为 HOME
    } else if (currentPath === '/favorite') {
      onTabChange(TABS.LIKED); // 如果是 FAVORITE 页面，设置 activeTab 为 LIKED
    } else if (currentPath === '/rated') {
      onTabChange(TABS.RATED); // 如果是 RATED 页面，设置 activeTab 为 RATED
    }
  }, [location, onTabChange]); // 当 location 变化时重新执行

  return (
    <TabsContainer>
      <Tab
        active={activeTab === TABS.HOME}
        onClick={() => onTabChange(TABS.HOME)}>
        <Link to='/'>HOME</Link>
      </Tab>

      <Tab
        active={activeTab === TABS.LIKED}
        onClick={() => onTabChange(TABS.LIKED)}>
        <Link to='/favorite'>FAVORITE</Link>
      </Tab>

      <Tab
        active={activeTab === TABS.RATED}
        onClick={() => onTabChange(TABS.RATED)}>
        <Link to='/rated'>RATED</Link>
      </Tab>

    </TabsContainer>
  );
}

const TabsContainer = styled.ul`
  display: flex;
  a { 
    color: white;             
    text-decoration: none; 
  }
  a:hover {
    color: lightgreen;
    font-weight: 600;
  }
`;
