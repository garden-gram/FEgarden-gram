import React, { useEffect, useState } from 'react';
import { css, styled } from 'styled-components';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { FaRegWindowClose } from 'react-icons/fa';
import { defaultUserImage } from './UserProfile';

function Post({ closeModal }) {
  const [attachment, setAttachment] = useState('');
  const [contents, setContents] = useState('');
  const { uid, displayName, photoURL } = auth.currentUser;

  const onSubmitGram = async (e) => {
    e.preventDefault();
    const currentUserData = await getDoc(doc(db, 'users', uid));
    try {
      if (attachment === '') return alert('이미지를 넣어주세요');
      if (contents === '') return alert('게시글 내용을 작성해주세요');
      if (!window.confirm('게시하시겠습니까?')) return;

      if (!currentUserData.exists()) {
        const newUserOBj = {
          user_img: defaultUserImage,
          nickName: displayName
        };
        await setDoc(doc(db, 'users', uid), newUserOBj);
      }

      const attachmentRef = ref(storage, `${uid}/${uuidv4()}`);
      await uploadString(attachmentRef, attachment, 'data_url');
      const attachmentUrl = await getDownloadURL(ref(storage, attachmentRef));
      const gramObj = {
        feed_id: `${uid}/${uuidv4()}`,
        uid,
        posts_image: attachmentUrl,
        like_count: 0,
        contents,
        time: Date.now()
      };
      await addDoc(collection(db, 'gram'), gramObj);
      setContents('');
      setAttachment('');
      alert('성공적으로 게시되었습니다.');
      closeModal();
    } catch (err) {
      // alert('오류가 발생했습니다. 새로고침 후 다시 시도해보세요');
      console.log(err);
    }
  };

  const onFileChange = (e) => {
    const {
      target: { files }
    } = e;
    if (files.length === 0) return;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result }
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment('');
  };

  const onTextChange = (e) => {
    const {
      target: { value }
    } = e;
    setContents(value);
  };

  return (
    <>
      <PostForm onSubmit={onSubmitGram}>
        <UserInfo>
          <UserImg src={photoURL ?? defaultUserImage} alt="user_img" />
          <UserName>{displayName}</UserName>
        </UserInfo>
        <ImgBox>
          <label htmlFor="file">
            <BtnUpload>파일 업로드하기</BtnUpload>
          </label>
          <ImgInput type="file" id="file" accept="image/*" onChange={onFileChange} />
          {attachment && (
            <PreView>
              <PreViewImg src={attachment} alt="" />
              <RemoveImg onClick={onClearAttachment}>
                <FaRegWindowClose size={30} />
              </RemoveImg>
            </PreView>
          )}
        </ImgBox>
        <TextBox value={contents} placeholder="내용을 입력해주세요." onChange={onTextChange} />
        <Btns>
          <SubmitBtn>게시하기</SubmitBtn>
          <ModalCloseBtn onClick={closeModal}>닫기</ModalCloseBtn>
        </Btns>
      </PostForm>
    </>
  );
}

export default Post;

const Center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0.6rem;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: start;
`;

const UserImg = styled.img`
  width: 63px;
  height: 63px;
  border-radius: 50%;
`;

const UserName = styled.p`
  font-size: 20px;
`;

const ImgBox = styled.div`
  ${Center}
  width: 28.5rem;
  height: 28.5rem;
  background-color: #d9d9d9;
  border-radius: 10px;
  position: relative;
`;

const TextBox = styled.textarea`
  border: 2px solid #5c5c5c;
  border-radius: 10px;
  width: 437px;
  height: 100px;
  resize: none;
  font-size: 20px;

  padding: 0.6rem;
  margin-top: 0.6rem;
`;

const Btns = styled.div`
  display: flex;
`;

export const SubmitBtn = styled.button`
  width: 130px;
  height: 50px;

  background-color: #151d0c;
  color: #fff;
  border: 0.1rem solid #76a341;
  border-radius: 15px;
  margin-top: 0.6rem;
  font-size: 1.3rem;
  cursor: pointer;
  &:hover {
    background-color: #5d8233;
    color: #fff;
  }
`;

const ModalCloseBtn = styled(SubmitBtn)`
  margin-left: 30px;
`;

const PreView = styled.div`
  ${Center}
`;

const PreViewImg = styled.img`
  position: absolute;
  width: 460px;
  height: 460px;
  top: 0px;
  right: 0px;
  border-radius: 10px;
  object-fit: cover;
`;

const RemoveImg = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    scale: 1.1;
  }
`;

const ImgInput = styled.input`
  display: none;
`;

const BtnUpload = styled.div`
  ${Center}
  width: 150px;
  height: 30px;
  font-size: 1.3rem;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;
