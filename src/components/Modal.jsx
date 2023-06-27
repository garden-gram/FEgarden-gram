import React, { useState } from 'react';
import { styled } from 'styled-components';

function Modal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <button onClick={openModal}>모달버튼</button>
      {isOpenModal && (
        <StModalBox>
          <StModalContents>
            <p>게시물작성하기 영역</p>
            <button onClick={closeModal}>닫기</button>
          </StModalContents>
        </StModalBox>
      )}
    </div>
  );
}

export default Modal;

const StModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StModalContents = styled.div`
  background-color: #fff;
  width: 50%;
  height: 75%;
  border-radius: 12px;
  margin: 10px;
`;
