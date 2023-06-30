import React from 'react';
import styled from 'styled-components';
import PostInfo from './mainPosts/PostInfo';
import PostLike from './mainPosts/PostLike';
import PostContents from './mainPosts/PostContents';

function MainPost({ gram }) {
  return (
    <StPostWrapper>
      <PostInfo gram={gram} />
      <ContentsWrapper>
        <ImgBox>
          <StImg src={gram.posts_image} />
        </ImgBox>
        <ContentsBox>
          <PostLike gram={gram} />
          <PostContents gram={gram} />
        </ContentsBox>
      </ContentsWrapper>
    </StPostWrapper>
  );
}

export default MainPost;

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
