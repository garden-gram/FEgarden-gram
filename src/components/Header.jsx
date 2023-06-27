import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/icon/logo_white.svg';

const Header = () => {
  const navigate = useNavigate();

  return (
    <StHeader onClick={() => navigate('/')}>
      <StTitle>Garden Gram</StTitle>
      <StImg src={Logo} alt="Garden-gram-logo" />
    </StHeader>
  );
};

export default Header;
const StTitle = styled.div`
  font-size: 3rem;
  color: #ffffff;
  margin-right: 1.8rem;
`;

const StImg = styled.img`
  width: 3.5rem;
  height: 4rem;
`;

const StHeader = styled.div`
  border: 1px solid #ddd;
  height: 6.25rem;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #6c8d64;
  cursor: pointer;
`;
