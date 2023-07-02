import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_FEED, updateContent } from '../../redux/modules/gramData';
import { deleteDoc, updateDoc, doc, query, where, collection, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import styled from 'styled-components';
import dot_img from '../../assets/icon/dote_edit_delete.svg';
import userImg from '../../assets/icon/userImg.png';
function ListHeader({ gram, name, users_img }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users);
  const grams = useSelector((state) => state.grams);

  const { time, uid } = gram;

  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };
  const nowDate = detailDate(time);

  const [optionBtn, setOptionBtn] = useState(false);
  const showOptionBtn = () => {
    setOptionBtn(!optionBtn);
  };

  const btnsRef = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (btnsRef.current && btnsRef.current !== event.target) {
        setOptionBtn(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const deleteHandler = async (id) => {
    try {
      const confirm = await deletePost(id);
      if (!confirm) return;
      alert('게시글이 삭제 되었습니다.');
    } catch (error) {
      alert('삭제 요청이 실패 하였습니다.');
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) return false;
    try {
      const postRef = doc(db, 'gram', id);
      await deleteDoc(postRef);
      dispatch({
        type: DELETE_FEED,
        payload: id
      });
    } catch (error) {
      alert('서버에서 데이터 삭제 요청이 실패 하였습니다.');
    }
  };

  const editHandler = () => {
    const editedContent = prompt('수정할 내용을 입력하세요', gram.contents);
    if (editedContent) {
      dispatch(updateContent(gram.id, editedContent));
    }
  };

  return (
    <StInfoWrapper>
      <StProfile>
        <StUserImg src={users_img} />
        <StUserName>{name}</StUserName>
      </StProfile>

      <StInfo>
        <StTime>{nowDate}</StTime>
        <Dot src={dot_img} alt="dot" onClick={showOptionBtn} />
        {optionBtn & (uid === currentUser.uid) ? (
          <OptionBtns ref={btnsRef}>
            <EditBtn onMouseDown={() => editHandler(gram.id)}>수정</EditBtn>
            <DeleteBtn onMouseDown={() => deleteHandler(gram.id)}>삭제</DeleteBtn>
          </OptionBtns>
        ) : (
          ''
        )}
      </StInfo>
    </StInfoWrapper>
  );
}

export default ListHeader;

const StInfoWrapper = styled.div`
  width: 28rem;
  height: 4.5rem;
  margin-bottom: 1rem;

  background-color: #ffff;

  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const StProfile = styled.div`
  width: 11rem;
  height: 4.5rem;

  display: flex;
  align-items: center;
`;

const StUserImg = styled.img`
  width: 4.2rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: #ffff;
`;

const StUserName = styled.div`
  font-size: 1.3rem;
  margin-left: 1.25rem;
`;

const StInfo = styled.div`
  width: 7.5rem;
  height: 2.4rem;

  margin-right: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StTime = styled.div`
  margin-right: 1rem;
`;

const OptionBtns = styled.div`
  width: 92px;
  height: 72px;
  border-radius: 10px;
  border: solid 1px #000;
  background-color: #fff;
  position: absolute;

  right: -60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  cursor: pointer;
`;

const EditBtn = styled.div`
  height: 40px;
  width: 100px;
  text-align: center;
  padding: 5px 0;

  &:hover {
    background-color: #bababa;
  }
`;

const DeleteBtn = styled(EditBtn)`
  border-top: 1px solid #bababa;
`;

const Dot = styled.img`
  cursor: pointer;
  padding: 0.8rem;
`;
