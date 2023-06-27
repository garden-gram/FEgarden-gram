import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <StHeader>
      <div>
        Garden-gram
        <Img src="../assets/icon/logo_white.svg" alt="logo" />
      </div>
    </StHeader>
  );
}

export default Header;

const StHeader = styled.div`
  border: 1px solid #ddd;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  background-color: #6c8d64;
`;

const Img = styled.img``;
