import React, { useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import PostList from '../components/PostList';

function Main() {
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
      <PostList />
      <Modal closeModal={closeModal} isOpenModal={isOpenModal} />
    </>
  );
}

export default Main;
