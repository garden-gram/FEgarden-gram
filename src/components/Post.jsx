import React, { useRef, useState } from 'react';
import { css, styled } from 'styled-components';
import userImg from '../assets/icon/userImg.png';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

function PostModal({ closeModal }) {
  const [attachment, setAttachment] = useState('');
  const [contents, setContents] = useState('');
  const fileInput = useRef();

  // TODO: userData를 리덕스로 가져와야함
  // const userObj = useSelector(state => {
  //   return state.user
  // })
  const userObj = {
    uid: '56da4645aaa',
    name: '아이유'
  };

  const { uid, name } = userObj;

  const onSubmitGram = async (e) => {
    e.preventDefault();
    let confirm = window.confirm('정말로 게시하시겠습니다?');
    if (!confirm) return;
    if (attachment === '') return alert('이미지를 넣어주세요');
    if (contents === '') return alert('게시글 내용을 작성해주세요');

    let attachmentUrl = '';
    const attachmentRef = ref(storage, `${uid}/${uuidv4()}`);
    await uploadString(attachmentRef, attachment, 'data_url');
    attachmentUrl = await getDownloadURL(ref(storage, attachmentRef));
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
    closeModal();
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
    <>
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
          <ModalCloseBtn onClick={closeModal}>닫기</ModalCloseBtn>
        </Btns>
      </PostForm>
    </>
  );
}
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
  height: 100px;
  resize: none;
  font-size: 20px;

  padding: 10px;
  margin-top: 10px;
`;

const Btns = styled.div`
  display: flex;
`;

export const SubmitBtn = styled.button`
  width: 130px;
  height: 50px;

  background-color: #fff;
  color: #000;
  border: 4px solid #5d8233;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 20px;
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
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

export default PostModal;
