import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import PostList from '../components/PostList';

import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { getdata } from '../redux/modules/gramData';

function Main() {
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
