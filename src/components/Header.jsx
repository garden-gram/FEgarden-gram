import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/icon/logo_white.svg';

const Header = () => {
  const navigate = useNavigate();

  return (
    <StHeader onClick={() => navigate('/')}>
      <StTitle>Garden-gram</StTitle>
      <StImg src={Logo} alt="Garden-gram-logo" />
    </StHeader>
  );
};

export default Header;
const StTitle = styled.div`
  font-size: 64px;
  color: #ffffff;
  margin-right: 30px;
`;

const StImg = styled.img`
  width: 52px;
  height: 66.58px;
`;

const StHeader = styled.div`
  border: 1px solid #ddd;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  background-color: #6c8d64;
  cursor: pointer;
`;
