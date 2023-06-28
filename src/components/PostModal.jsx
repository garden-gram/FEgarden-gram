import React, { useRef, useState } from 'react';
import { css, styled } from 'styled-components';
import userImg from '../assets/icon/userImg.png';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

function PostModal() {
  const [attachment, setAttachment] = useState('');
  const [contents, setContents] = useState('');
  const fileInput = useRef();

  const userObj = {
    uid: '56da4645aaa',
    name: '아이유'
  };

  const { uid, name } = userObj;

  const onSubmitGram = async (e) => {
    e.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = ref(storage, `${userObj.uid}`);
      await uploadString(attachmentRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(ref(storage, attachmentRef));
    }
    const users_img = userObj.img ?? 'default';
    const gramObj = {
      feed_id: `${uid}/${uuidv4()}`,
      name,
      users_img,
      posts_image: attachmentUrl,
      like_count: 0,
      contents,
      time: Date.now()
    };
    await addDoc(collection(db, 'gram'), gramObj);
    setContents('');
    setAttachment('');
    alert('성공적으로 게시되었습니다.');
  };

  const onFileChange = (e) => {
    const {
      target: { files }
    } = e;
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
    fileInput.current.value = null;
  };

  const onTextChange = (e) => {
    const {
      target: { value }
    } = e;
    setContents(value);
  };

  return (
    <Layout>
      <PostForm onSubmit={onSubmitGram}>
        <UserInfo>
          <UserImg src={userImg} alt="user_img" />
          <UserName>{name}</UserName>
        </UserInfo>
        <ImgBox>
          <label htmlFor="file">
            <BtnUpload>파일 업로드하기</BtnUpload>
          </label>
          <ImgInput ref={fileInput} type="file" id="file" accept="image/*" onChange={onFileChange} />
          {attachment && (
            <PreView>
              <PreViewImg src={attachment} alt="" />
              <RemoveImg onClick={onClearAttachment}>X</RemoveImg>
            </PreView>
          )}
        </ImgBox>
        <TextBox value={contents} placeholder="내용을 입력해주세요." onChange={onTextChange} />
        <Btns>
          <SubmitBtn>게시하기</SubmitBtn>
        </Btns>
      </PostForm>
    </Layout>
  );
}
const Center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Layout = styled.div`
  ${Center}
  height: 100vh;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 600px;
  height: 80vh;

  border: 2px solid #000;
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
`;

const UserName = styled.p`
  font-size: 20px;
`;

const ImgBox = styled.div`
  ${Center}
  width: 460px;
  height: 460px;
  background-color: #d9d9d9;
  border-radius: 10px;
  position: relative;
`;

const TextBox = styled.textarea`
  border: 2px solid #000;
  border-radius: 10px;
  width: 437px;
  height: 127px;
  resize: none;
  font-size: 20px;

  padding: 10px;
  margin-top: 10px;
`;

const Btns = styled.div`
  display: flex;
`;

const SubmitBtn = styled.button`
  width: 170px;
  height: 54px;
  color: #fff;
  border-radius: 10px;
  background-color: #5d8233;
  margin-top: 10px;
  font-size: 24px;
  cursor: pointer;
  border: none;
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
`;

const RemoveImg = styled.button`
  position: absolute;
  font-size: 1.5rem;
  top: 0;
  right: 0;
  background-color: transparent;
  color: #fff;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

const ImgInput = styled.input`
  display: none;
`;

const BtnUpload = styled.div`
  ${Center}
  width: 150px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

export default PostModal;
