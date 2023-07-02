import React from 'react';
import { styled } from 'styled-components';
import Post from './Post';
import { createPortal } from 'react-dom';

function Modal({ isOpenModal, closeModal }) {
  return (
    <div>
      {/* <PostModalBtn onClick={openModal}>게시물 등록하기</PostModalBtn> */}
      {isOpenModal &&
        createPortal(
          <StModalBox>
            <StModalContents>
              <Post closeModal={closeModal} />
            </StModalContents>
          </StModalBox>,
          document.getElementById('portal-target')
        )}
    </div>
  );
}

export default Modal;

const StModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(99, 99, 99, 0.4);

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
