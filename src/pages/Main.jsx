import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import PostLists from '../components/PostLists';
import { getdata } from '../redux/modules/gramData';
import { getUserData } from '../redux/modules/userData';
import { QuerySnapshot, collection, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

function Main() {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  // 서버에서 Post목록 전부 받아서 리덕스에 데이터 넣기(실시간 데이터 추적)
  useEffect(() => {
    const q = query(collection(db, 'gram'), orderBy('time', 'desc'));
    onSnapshot(q, (snapshot) => {
      const initialGramsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch(getdata(initialGramsData));
    });
  }, []);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <body style={{ minWidth: '950px' }}>
      <Header />
      <Sidebar openModal={openModal} />
      <PostLists />
      <Modal closeModal={closeModal} isOpenModal={isOpenModal} />
      <ScrollToTopButton onClick={scrollToTop}>TOP</ScrollToTopButton>
    </body>
  );
}

export default Main;

// 스타일
const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 3rem;
  right: 38rem;
  padding: 0.7rem;
  background-color: #d6d6d6;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 3.5rem;
  height: 3.5rem;
  font-weight: 600;
  font-size: 1.1rem;
`;
