import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DefaultProfileImg from '../assets/img/blank_profile.svg';
import { AiOutlineCheckSquare } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// 유저프로필 초기값 설정
function UserProfile() {
  const [editName, setEditName] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: '', name: '', user_img: '' }); // 초기에 데이터 없음 -> null 병합 연산자 쓸 예정

  const { id, name, user_img } = currentUser;
  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const user = auth.currentUser;
  //     console.log(user.email);
  //   } else {
  //     return;
  //   }
  // });

  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 users인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);

      const initialUsers = [];

      // document의 id와 데이터를 initialUsers에 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        initialUsers.push({ id: doc.id, ...doc.data() });
      });

      // firestore에서 가져온 데이터를 state에 전달
      setCurrentUser(initialUsers[0]);
    };

    fetchData();
  }, []);

  return (
    // 프로필 제일 바깥 컨테이너
    <CurrentUserProfileContainer>
      {/* 기본으로 설정되는 프로필 이미지 */}
      <DefaultProfileImage src={DefaultProfileImg} alt="profileImage" />

      {/* 프로필 내용(콘텐츠) 담는 리스트 */}
      <CurrentUserProfileList>
        {/* 프로필 내용(콘탠츠) 좌측 부분 */}
        <CurrentUserProfileContentsLeft>
          <div>Nickname</div>
          <div>User ID</div>
          <div>TOTAL POST</div>
          <div>TOTAL LIKE</div>
        </CurrentUserProfileContentsLeft>

        {/* 프로필 내용(콘탠츠) 우측 부분 */}
        <CurrentUserProfileContentsRight>
          <div>
            {editName ? <input /> : name}

            {editName ? (
              <AiOutlineCheckSquare />
            ) : (
              <FaRegEdit
                onClick={() => {
                  setEditName(!editName);
                }}
              />
            )}
          </div>
          <div>test@gmail.com</div>
          <div>2</div>
          <div>14</div>
        </CurrentUserProfileContentsRight>
      </CurrentUserProfileList>
    </CurrentUserProfileContainer>
  );
}

// 스타일드 컴포넌트

const EditIcon = styled.div`
  width: 1.2rem;
`;

const DefaultProfileImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin: 1rem 0rem;
`;

const CurrentUserProfileContainer = styled.div`
  margin: 6rem auto;
  width: 30rem;
  height: 28rem;
  background-color: #d9d9d9;
  border-radius: 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CurrentUserProfileList = styled.ul`
  list-style: none;
  width: 80%;
  padding: 0;
  display: flex;
  justify-content: space-around;
`;

const CurrentUserProfileContentsLeft = styled.li`
  width: 40%;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
  & > div {
    padding: 1rem;
  }
`;

const CurrentUserProfileContentsRight = styled.li`
  width: 60%;
  & > div {
    padding: 1rem;
    border-bottom: 1px solid #b0b0b0;
  }
  & > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default UserProfile;
