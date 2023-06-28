import React from 'react';
import Header from '../components/Header';
import PostModal from '../components/PostModal';
import Modal from '../components/Modal';

function Main() {
  return (
    <>
      {/* <Header /> */}
      <div>
        <PostModal />
      </div>
      <Header />
      <div>Main</div>
      <Modal />
    </>
  );
}

export default Main;
