import React, { useEffect } from 'react';
import styled from 'styled-components';
import ListHeader from './list/ListHeader';
import ListLike from './list/ListLike';
import ListContents from './list/ListContents';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function List({ gram }) {
  let name, users_img;

  const userData = async () => {
    const q = doc(db, 'users', gram.uid);

    const querySnapshot = await getDoc(q);
    console.log(querySnapshot.data());
    const { user_img, nickName } = querySnapshot.data();
    name = nickName;
    users_img = user_img;
    console.log(user_img, nickName);
  };
  useEffect(() => {
    userData();
  }, []);

  return (
    <StPostWrapper>
      <ListHeader gram={gram} users_img={users_img} name={name} />
      <ContentsWrapper>
        <ImgBox>
          <StImg src={gram.posts_image} />
        </ImgBox>
        <ContentsBox>
          <ListLike gram={gram} />
          <ListContents gram={gram} />
        </ContentsBox>
      </ContentsWrapper>
    </StPostWrapper>
  );
}

export default List;

const StPostWrapper = styled.div`
  width: 28rem;
  // height: 40rem;
  border-radius: 10px;
  margin: 2rem auto 0;
`;
const ContentsWrapper = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 0 0 10px 10px;
`;

const ImgBox = styled.div`
  display: flex;
`;
const StImg = styled.img`
  overflow: hidden;
  width: 28rem;
  height: 28rem;
  // margin-top: 0.5rem;
  border-radius: 10px 10px 0 0;
`;

const ContentsBox = styled.div`
  padding: 10px;
`;
