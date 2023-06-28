import React, { useState } from 'react';
import { styled } from 'styled-components';
import PostModal, { SubmitBtn } from './Post';
import { createPortal } from 'react-dom';

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
      <PostModalBtn onClick={openModal}>게시물 등록하기</PostModalBtn>
      {isOpenModal &&
        createPortal(
          <StModalBox>
            <StModalContents>
              <PostModal closeModal={closeModal} />
            </StModalContents>
          </StModalBox>,
          document.getElementById('portal-target')
        )}
    </div>
  );
}

export default Modal;

const StModalBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(99, 98, 98, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StModalContents = styled.div`
  background-color: #fff;
  width: 560px;
  height: 750px;
  border-radius: 12px;
  margin: 1rem;
`;

const PostModalBtn = styled(SubmitBtn)`
  width: 160px;
`;
