import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import PostList from '../components/PostLists';
import UserProfile from '../components/UserProfile';

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';

import { useDispatch, useSelector } from 'react-redux';
import { getdata } from '../redux/modules/gramData';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserData } from '../redux/modules/userData';

import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

function Profile() {
  // 현재 사용자의 게시물 리스트
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.users);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'gram'), where('uid', '==', currentUser.uid), orderBy('time', 'desc'));
      const querySnapshot = await getDocs(q);
      const initialGramsData = [];
      querySnapshot.forEach((doc) => {
        initialGramsData.push({ id: doc.id, ...doc.data() });
      });
      setPostCount(initialGramsData.length);
      dispatch(getdata(initialGramsData));
    };
    try {
      if (currentUser.uid !== undefined) fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [currentUser]);

  // 게시물 작성 모달
  const [isOpenModal, setIsOpenModal] = useState(false);

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
      <Modal closeModal={closeModal} isOpenModal={isOpenModal} />
      <UserProfile currentUser={currentUser} postCount={postCount} />
      <ScrollToTopButton onClick={scrollToTop}>TOP</ScrollToTopButton>
      <PostList />
    </body>
  );
}

export default Profile;

// 스타일
const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 50px;
  left: 123px;
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
