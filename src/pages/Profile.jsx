import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import PostList from '../components/PostList';
import UserProfile from '../components/UserProfile';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';

import { useDispatch } from 'react-redux';
import { getdata } from '../redux/modules/gramData';

function Profile() {
  // 초기값 설정 : 데이터 없음
  const [currentUser, setCurrentUser] = useState('');

  // 로그인한 유저 아이디 가져오기
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const newCurrentUser = {
          id: user.uid
        };
        setCurrentUser(newCurrentUser);
        //  else {
        // User is signed out
        // }
      }
    });
  }, [auth]);
  console.log(currentUser.id);

  // 게시물 리스트
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'gram'));
      const querySnapshot = await getDocs(q);

      const initialGramsData = [];

      querySnapshot.forEach((doc) => {
        initialGramsData.push({ id: doc.id, ...doc.data() });
      });

      dispatch(getdata(initialGramsData));
    };
    fetchData();
  }, []);

  // 게시물 작성 모달
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
      <PostList />
    </>
  );
}

export default Profile;
