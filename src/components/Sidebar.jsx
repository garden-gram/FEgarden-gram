import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function Sidebar({ openModal }, { isOpenModal }) {
  const navigate = useNavigate();

  // 초기값 설정 : 데이터 없음
  const [currentUser, setCurrentUser] = useState('');

  // 로그인한 유저 아이디 가져오기
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const newCurrentUser = {
          id: user.uid
        };
        setCurrentUser(newCurrentUser);
        //  else {
        // User is signed out
        // }
      }
    });
  }, [auth]);

  const id = currentUser.id;

  // 현재 경로 가져오기
  const location = useLocation();
  // 현재 경로 중 마지막 부분(아이디) 가져오기
  const currentId = location.pathname.split('/')[3];

  // 로그인 시 사이드바에 '로그아웃' 보이고 로그아웃 시 '로그인' 보이게 하기
  const LoginLogout = () => {
    // (현재 로그인된 상태면 -> isLogin이 true고, 아니면 false임)
    if (id === undefined) {
      return false;
    } else {
      return true;
    }
  };

  // 로그아웃 버튼 클릭 시 : 홈페이지로 이동 & 로그아웃
  const logOutAndGoHome = (event) => {
    navigate('/');
    logOut(event);
    window.location.replace('/'); // 홈페이지로 url을 변경하여 다시 로드함(이전페이지 기록이 남지 않음)
  };

  // 로그아웃 기능
  const logOut = async (event) => {
    // event.preventDefault(); // a, form(onsubmit)에만 씀!!!!!!
    alert('정상적으로 로그아웃 되었습니다.');

    await signOut(auth);
  };

  return (
    <nav>
      <SidebarContainer>
        <SidebarContent onClick={() => navigate('/')}>홈</SidebarContent>
        <SidebarContent onClick={openModal}>글 올리기</SidebarContent>
        <SidebarContent onClick={() => navigate(`/profile/mypage/${id}`)}>내 프로필</SidebarContent>
        <SidebarContent>
          <SidebarContentLogin isLogin={LoginLogout()} onClick={() => navigate('/login')}>
            로그인
          </SidebarContentLogin>
          <SidebarContentLogout isLogin={LoginLogout()} onClick={logOutAndGoHome}>
            로그아웃
          </SidebarContentLogout>
        </SidebarContent>
      </SidebarContainer>
    </nav>
  );
}

const SidebarContainer = styled.ul`
  list-style: none;
  width: 12rem;
  position: fixed;
  top: 10rem;
`;

const SidebarContent = styled.li`
  padding: 1rem 0rem;
  border-bottom: 1px solid #85a389;
  display: flex;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #d9d9d9;
  }

  &:active {
    color: #6c8d64;
  }
`;

const SidebarContentLogin = styled.span`
  display: ${(props) => (props.isLogin ? 'none' : 'block')};
`;

const SidebarContentLogout = styled.span`
  display: ${(props) => (props.isLogin ? 'block' : 'none')};
`;

export default Sidebar;
