import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
// import { auth } from "../firebase"; 얘는 왜 안쓰고...getAuth를 썼을까 ?
import 'firebase/compat/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import styled from 'styled-components';
import backgroundImage from '../assets/img/background_img.jpg';
import logoImage from '../assets/icon/logo_white.svg';
import { useNavigate } from 'react-router';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [nickname, setNickname] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      // 로그인 성공 시 확인
      alert('로그인이 완료되었습니다.');
      navigate('/');

      // uid를 사용하여 로그인 처리
      // ...
    } catch (error) {
      // 로그인 실패 시 에러
      console.log(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // 닉네임 등록
      await updateProfile(userCredential.user, {
        displayName: nickname
      });

      // 회원가입 완료 시 확인
      alert('회원가입이 완료되었습니다.');
      // 입력 필드 초기화
      setEmail('');
      setPassword('');
      setNickname('');

      // 회원가입 후 초기화
      setIsSignUp(false);
    } catch (error) {
      // 회원가입 실패 시 에러
      console.log(error);
    }
  };

  const handleSignUpToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // *********************후순위 소셜로그인
  // const handleSignInWithGoogle = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const auth = getAuth();
  //     // 구글 로그인 팝업을 통해 인증
  //     const provider = new firebase.auth.GoogleAuthProvider();
  //     const userCredential = await signInWithPopup(auth, provider);
  //     const uid = userCredential.user.uid;

  //     // uid를 사용하여 로그인 처리
  //     // ...
  //   } catch (error) {
  //     // 로그인 실패 시 에러 처리
  //     console.log(error);
  //   }
  // };

  // const handleSignInWithGitHub = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const auth = getAuth();
  //     // 깃허브 로그인 팝업을 통해 인증
  //     const provider = new firebase.auth.GithubAuthProvider();
  //     const userCredential = await signInWithPopup(auth, provider);
  //     const uid = userCredential.user.uid;

  //     // uid를 사용하여 로그인 처리
  //     // ...
  //   } catch (error) {
  //     // 로그인 실패 시 에러 처리
  //     console.log(error);
  //   }
  // };

  return (
    <Container>
      <LeftContainer>
        <Logo src={logoImage} alt="Logo" />
        <Title>Garden Gram</Title>
      </LeftContainer>
      <RightContainer>
        <Description>설명란</Description>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
              required
            />
          </FormGroup>
          <FormGroup>
            <PasswordLabel htmlFor="password">P / W</PasswordLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
            />
          </FormGroup>
          {isSignUp && (
            <FormGroup>
              <Label htmlFor="nickname">NickName</Label>
              <Input
                type="text"
                id="nickname"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="닉네임"
                required
              />
            </FormGroup>
          )}
          <ButtonContainer>
            {isSignUp ? (
              <>
                <Button type="button" onClick={handleSignUp}>
                  Done
                </Button>
                <Button type="button" onClick={handleSignUpToggle}>
                  Cancle
                </Button>
              </>
            ) : (
              <>
                <Button type="submit">Sign In</Button>
                <Button type="button" onClick={handleSignUpToggle}>
                  Sign Up
                </Button>
              </>
            )}
          </ButtonContainer>
        </Form>
      </RightContainer>
    </Container>
  );
}

export default LoginPage;

{
  /* <button type="submit" onClick={handleSignInWithGoogle}>
          Sign in with Google
        </button>
        <button type="submit" onClick={handleSignInWithGitHub}>
          Sign in with GitHub
        </button> */
}
// 스타일
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage});
  background-size: cover;
  background-position: center;
  width: 720px;
  height: 100vh;
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
`;

const Title = styled.h1`
  font-size: 106px;
  margin-top: 8px;
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
`;

const Description = styled.div`
  margin-bottom: 20px;
  background-color: #d9d9d9;
  width: 507px;
  height: 187px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  margin-right: 20px;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 405px;
  height: 50.44px;
`;

const PasswordLabel = styled(Label)`
  padding: 5px 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #d6d6d6;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  width: 190.27px;
  height: 44.84px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 414px;
  margin-left: 67px;
`;
