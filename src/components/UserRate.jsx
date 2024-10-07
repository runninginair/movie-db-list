import React, { useState, useEffect } from 'react';
import { addRating } from '../apis/addRating';
import { useAuth } from "./AuthContext";
import styled from 'styled-components';
import Button from './Button';


export default function UserRating({ movie_id }) {
  const [selectedRating, setSelectedRating] = useState(null); // 用户选择的评分
  const [submittedRating, setSubmittedRating] = useState(null); // 用户提交的评分
  const { authData } = useAuth();

  let sessionId = null;
  if (authData) {
    sessionId = authData.sessionId;
  }

  // 从 localStorage 中获取已存储的评分并更新 submittedRating
  useEffect(() => {
    if (movie_id && authData) { // 仅在用户登录时获取评分
      const ratedMovies = JSON.parse(localStorage.getItem('ratedMovies')) || {};

      // 打印调试信息
      console.log('movie_id:', movie_id);
      console.log('ratedMovies from localStorage:', ratedMovies);

      if (ratedMovies[movie_id]) {
        setSubmittedRating(ratedMovies[movie_id]);  // 从 localStorage 中获取评分
        console.log('Rating found for movie_id:', movie_id, 'Rating:', ratedMovies[movie_id]);
      } else {
        console.log('No rating found for movie_id:', movie_id);
      }
    }
  }, [movie_id, authData]); // 只在 movie_id 或 authData 变化时执行

  // 处理选择评分
  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  // 提交评分
  const handleSubmit = async () => {
    try {
      setSubmittedRating(selectedRating);  // 更新显示的评分

      // 调用 addRating API，传入 movie_id 和 selectedRating
      console.log(movie_id, selectedRating, sessionId);
      const response = await addRating(movie_id, selectedRating, sessionId);

      // 更新 localStorage
      const ratedMovies = JSON.parse(localStorage.getItem('ratedMovies')) || {};
      ratedMovies[movie_id] = selectedRating;
      localStorage.setItem('ratedMovies', JSON.stringify(ratedMovies));

      // console.log('Updated localStorage with rating:', selectedRating);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* 显示当前选择的评分，或者显示 "Not Yet!" */}
      <RatingDisplay>
        {!authData || submittedRating === null ? 'Not Yet!' : submittedRating + " / 10"}
      </RatingDisplay>

      {/* 下拉选择输入框 */}
      {authData && ( // 仅在用户登录时显示评分选择
        <>
          <StyledSelect value={selectedRating || ''} onChange={handleRatingChange}>
            <option value="" disabled>Select rating</option> {/* 提示用户选择 */}
            {Array.from({ length: 19 }, (_, i) => (i * 0.5 + 1).toFixed(1)).map((num) => (
              <option key={num} value={num}>{num}</option> // 创建 1.0-10.0 的选项
            ))}
          </StyledSelect>

          {/* 提交按钮 */}
          <Button onClick={handleSubmit} disabled={selectedRating === null}>
            Submit
          </Button>
        </>
      )}
    </div>
  );
}


const RatingDisplay = styled.div`
  display: inline-block;
  width: 100px;
  padding: 8px;
  background-color: lightblue;
  border: 1px solid #ccc;
  text-align: center;
  margin-right: 16px;
  margin-top: 5px;
  border-radius: 15px;
`;

const StyledSelect = styled.select`
  padding: 8px 6px;    /* 修改 padding */
  margin: 8px 5px;       /* 修改 margin */
  font-size: 16px;      /* 修改字体大小 */
  border-radius: 4px;   /* 可选：增加圆角 */
  border: 1px solid #ccc; /* 可选：自定义边框 */
`;
