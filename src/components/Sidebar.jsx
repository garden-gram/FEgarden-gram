import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function Sidebar({ openModal, isOpenModal }) {
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

  // 1) '로그아웃' 클릭 시 3단계 : 알림창 뜨고 확인 클릭 시 logoutAndGoHome 함수 실행
  const logoutAlert = () => {
    alert('로그아웃 하시겠습니까?');
    logoutAndGoHome();
  };

  // 2) 로그아웃 확인 클릭 시 홈페이지로 이동 & 로그아웃
  const logoutAndGoHome = (event) => {
    navigate('/');
    logOut(event);
    window.location.replace('/'); // 홈페이지로 url을 변경하여 다시 로드함(이전페이지 기록이 남지 않음)
  };

  // 3) 로그아웃 기능
  const logOut = async () => {
    alert('정상적으로 로그아웃 되었습니다.');
    await signOut(auth);
  };

  // 사이드바 활성화 여부 구분
  function isActivatedHome() {
    if (location.pathname === '/') {
      return true;
    } else {
      return false;
    }
  }

  // '글 올리기' 클릭 시 로그인 여부에 따라 작동되는 함수
  function isLoginOnClickModal() {
    if (id === undefined) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
    } else {
      openModal();
    }
  }

  // '내 프로필' 클릭 시 로그인 여부에 따라 작동되는 함수
  function isLoginOnClickProfile() {
    if (id === undefined) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
    } else {
      navigate(`/profile/mypage/${id}`);
    }
  }

  return (
    <nav>
      <SidebarContainer>
        <SidebarContent isActivated={isActivatedHome()} onClick={() => navigate('/')}>
          홈
        </SidebarContent>
        <SidebarContent isOpenModal={isOpenModal} onClick={isLoginOnClickModal}>
          글 올리기
        </SidebarContent>
        <SidebarContent isActivated={isActivatedHome()} onClick={isLoginOnClickProfile}>
          내 프로필
        </SidebarContent>
        <SidebarContent>
          <SidebarContentLogin isLogin={LoginLogout()} onClick={() => navigate('/login')}>
            로그인
          </SidebarContentLogin>
          <SidebarContentLogout isLogin={LoginLogout()} onClick={logoutAlert}>
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

  // 활성화된 사이드바만 초록색으로 글자색 변경
  &:nth-child(1) {
    color: ${(props) => (props.isActivated ? '#6C8D64' : '#000000')};
  }
  // TODO: 글 올리기(모달) 활성화되면 초록색으로 수정!
  &:nth-child(2) {
    color: ${(props) => (props.isOpenModal ? '#6C8D64' : '#000000')};
  }

  &:nth-child(3) {
    color: ${(props) => (props.isActivated ? '#000000' : '#6C8D64')};
  }
`;

// 로그인 여부에 따라 로그인/로그아웃 다르게 보임(로그인)
const SidebarContentLogin = styled.span`
  display: ${(props) => (props.isLogin ? 'none' : 'block')};
`;

// 로그인 여부에 따라 로그인/로그아웃 다르게 보임(로그아웃)
const SidebarContentLogout = styled.span`
  display: ${(props) => (props.isLogin ? 'block' : 'none')};
`;

export default Sidebar;
