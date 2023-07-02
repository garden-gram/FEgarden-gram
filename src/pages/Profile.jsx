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

function Profile() {
  // 현재 사용자의 게시물 리스트
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.users);

  let postCount = 0;
  const fetchData = async () => {
    const q = query(collection(db, 'gram'), where('uid', '==', auth.currentUser.uid), orderBy('time', 'desc'));
    const querySnapshot = await getDocs(q);
    const initialGramsData = [];
    querySnapshot.forEach((doc) => {
      initialGramsData.push({ id: doc.id, ...doc.data() });
      postCount++;
      console.log(postCount);
    });
    dispatch(getdata(initialGramsData));
  };

  useEffect(() => {
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
    <body style={{ minWidth: '950px' }}>
      <Header />
      <Sidebar openModal={openModal} />
      <Modal closeModal={closeModal} isOpenModal={isOpenModal} />
      <UserProfile currentUser={currentUser} postCount={postCount} />
      <PostList />
    </body>
  );
}

export default Profile;
