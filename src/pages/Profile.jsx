import React, { useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';

function Profile() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Header />
      <Sidebar openModal={openModal} />
      <Modal closeModal={closeModal} isOpenModal={isOpenModal} />
      <UserProfile />
    </>
  );
}

// 스타일드 컴포넌트

// const EditIcon = styled.div`
//   width: 1.2rem;
// `;

const DefaultProfileImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin: 1rem 0rem;
`;

const CurrentUserProfileContainer = styled.div`
  margin: 6rem auto;
  width: 30rem;
  height: 28rem;
  background-color: #d9d9d9;
  border-radius: 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CurrentUserProfileList = styled.ul`
  list-style: none;
  width: 80%;
  padding: 0;
  display: flex;
  justify-content: space-around;
`;

const CurrentUserProfileContentsLeft = styled.li`
  width: 40%;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
  & > div {
    padding: 1rem;
  }
`;

const CurrentUserProfileContentsRight = styled.li`
  width: 60%;
  & > div {
    padding: 1rem;
    border-bottom: 1px solid #b0b0b0;
  }
  & > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
`;

// TODO: 커서 모양 바꾸기!!!
const EditProfileImgIcon = styled.div`
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const NameEditIconWrapper = styled.div`
  cursor: pointer;
`;

const NameInput = styled.input`
  width: 150px;
`;

export default Profile;
