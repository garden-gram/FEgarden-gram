import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Sidebar({ openModal }) {
  const navigate = useNavigate();

  return (
    <nav>
      <StSidebarContainer>
        <StSidebarContent onClick={() => navigate('/')}>홈</StSidebarContent>
        <StSidebarContent onClick={openModal}>글 올리기</StSidebarContent>
        <StSidebarContent onClick={() => navigate('/mypage/profile/:id')} style={{ fontWeight: 'bold' }}>
          내 프로필
        </StSidebarContent>
        <StSidebarContent onClick={() => navigate('')}>로그아웃</StSidebarContent>
      </StSidebarContainer>
    </nav>
  );
}

const StSidebarContainer = styled.ul`
  list-style: none;
  width: 12rem;
  position: fixed;
  top: 10rem;
`;

const StSidebarContent = styled.li`
  padding: 1rem 0rem;
  border-bottom: 1px solid #85a389;
  display: flex;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #d9d9d9;
  }
`;

export default Sidebar;
