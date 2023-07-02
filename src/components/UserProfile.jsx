import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DefaultProfileImg from '../assets/img/blank_profile.svg';
import { AiOutlineCheckSquare } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { PiUserSwitch } from 'react-icons/pi';
import { auth, db, storage } from '../firebase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../redux/modules/userData';

export const defaultUserImage =
  'https://firebasestorage.googleapis.com/v0/b/gardengram-b2bb2.appspot.com/o/blank_profile.svg?alt=media&token=0d5bdcc4-87a1-4995-8a80-90764b93b63e';

function Profile({ postCount, currentUser }) {
  const [editName, setEditName] = useState(false);

  const { uid, displayName, photoURL, email } = currentUser;
  const [editedName, setEditedName] = useState('');
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    return await getDoc(doc(db, 'users', uid));
  };
  fetchUserData();

  const onFileChange = async (e) => {
    const currentUserData = await getDoc(doc(db, 'users', uid));
    if (!currentUserData.exists()) {
      const newUserOBj = {
        user_img: defaultUserImage,
        nickName: displayName
      };
      await setDoc(doc(db, 'users', uid), newUserOBj);
    }
    const {
      target: { files }
    } = e;
    const theFile = files[0];
    const imageRef = ref(storage, `profileImg/${uid}`);
    await uploadBytes(imageRef, theFile);
    const attachmentUrl = await getDownloadURL(ref(storage, imageRef));
    updateProfile(auth.currentUser, { photoURL: attachmentUrl });
    updateDoc(doc(db, 'users', uid), { user_img: attachmentUrl });
    dispatch(updateUserData(attachmentUrl));
    alert('프로필 사진이 변경되었습니다.');
  };

  return (
    // 프로필 제일 바깥 컨테이너
    <CurrentUserProfileContainer>
      {/* 기본으로 설정되는 프로필 이미지 */}
      <ProfileImageWrapper>
        <DefaultProfileImage src={photoURL ?? defaultUserImage} alt="profileImage" />
        <EditProfileImgIcon>
          <label htmlFor="fileInput">
            <PiUserSwitch
              style={{
                position: 'absolute',
                bottom: '15px',
                right: '10px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                padding: '4px'
              }}
              size={30}
            />
          </label>
          <FileInput type="file" id="fileInput" accept="image/*" onChange={onFileChange} />
        </EditProfileImgIcon>
      </ProfileImageWrapper>
      {/* 프로필 내용(콘텐츠) 담는 리스트 */}
      <CurrentUserProfileList>
        {/* 프로필 내용(콘텐츠) 좌측 부분 */}
        <CurrentUserProfileContentsLeft>
          <div>NAME</div>
          <div>E-MAIL</div>
          <div>TOTAL POST</div>
          <div>TOTAL LIKE</div>
        </CurrentUserProfileContentsLeft>

        {/* 프로필 내용(콘텐츠) 우측 부분 */}
        <CurrentUserProfileContentsRight>
          <div>
            {editName ? <NameInput value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : displayName}
            <NameEditIconWrapper>
              {editName ? (
                <AiOutlineCheckSquare
                  size={25}
                  onClick={async () => {
                    await updateProfile(auth.currentUser, {
                      displayName: editedName
                    });
                    setEditName(!editName);
                  }}
                />
              ) : (
                <FaRegEdit
                  size={25}
                  onClick={() => {
                    setEditedName(displayName);
                    setEditName(!editName);
                  }}
                />
              )}
            </NameEditIconWrapper>
          </div>
          <div>{email}</div>
          <div>{postCount || 0}</div>
          <div>14</div>
        </CurrentUserProfileContentsRight>
      </CurrentUserProfileList>
    </CurrentUserProfileContainer>
  );
}

// 스타일드 컴포넌트

// const EditIcon = styled.div`
//   width: 1.2rem;
// `;

const DefaultProfileImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin: 1rem 0rem;
`;

const CurrentUserProfileContainer = styled.div`
  margin: 12rem auto 1rem auto;
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

const ProfileImageWrapper = styled.div`
  position: relative;
`;

// TODO: 커서 모양 바꾸기!!!
const EditProfileImgIcon = styled.div`
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const NameEditIconWrapper = styled.div`
  cursor: pointer;
`;

const NameInput = styled.input`
  width: 150px;
`;

export default Profile;
