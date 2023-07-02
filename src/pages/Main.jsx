import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import PostLists from '../components/PostLists';

import { QuerySnapshot, collection, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { getdata } from '../redux/modules/gramData';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getUserData } from '../redux/modules/userData';

function Main() {
  const dispatch = useDispatch();

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
      <PostLists />
      <Modal closeModal={closeModal} isOpenModal={isOpenModal} />
    </body>
  );
}

export default Main;
