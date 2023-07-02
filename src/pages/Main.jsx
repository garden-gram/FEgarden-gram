import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import PostList from '../components/PostList';

import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { getdata } from '../redux/modules/gramData';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getUserData } from '../redux/modules/userData';

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 소셜 로그인 시 닉네임 자동 생성
        if (user.displayName === null) {
          const name = user.email.split('@')[0];
          user.displayName = name;
        }
        if (user.photoURL === null) {
          user.photoURL =
            'https://firebasestorage.googleapis.com/v0/b/gardengram-b2bb2.appspot.com/o/profileImg%2Fblank_profile.svg?alt=media&token=a6ff8689-313f-4608-8498-49e2afa63520';
        }
        const userData = {
          name: user.displayName,
          uid: user.uid,
          email: user.email,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName })
        };
        dispatch(getUserData(userData));
      }
    });
  }, []);

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
    <>
      <Header />
      <Sidebar openModal={openModal} />
      <PostList />
      <Modal closeModal={closeModal} isOpenModal={isOpenModal} />
    </>
  );
}

export default Main;
