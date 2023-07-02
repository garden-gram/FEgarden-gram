import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
// import { auth } from "../firebase"; 얘는 왜 안쓰고...getAuth를 썼을까 ?
import 'firebase/compat/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import styled from 'styled-components';
import backgroundImage from '../assets/img/background_img.jpg';
import logoImage from '../assets/icon/logo_white.svg';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import googleIcon from '../assets/img/google_icon.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  // 로그인 이벤트 핸들
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      // 로그인 성공 시 확인
      alert('로그인이 완료되었습니다.');
      // 로그인 성공 시 메인페이지 이동
      navigate('/');
    } catch (error) {
      // 로그인 실패 시 에러
      const errorCode = error.code;
      let errorMessage = '';
      // 로그인 유효성 검사
      if (errorCode === 'auth/wrong-password') {
        errorMessage = '비밀번호가 일치하지 않습니다.';
      } else if (errorCode === 'auth/user-not-found') {
        errorMessage = '가입되지 않은 이메일입니다.';
      } else {
        errorMessage = '로그인에 실패했습니다.';
      }

      alert(errorMessage);
    }
  };

  // 회원가입 이벤트 핸들
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // 비밀번호 유효성 검사
      if (password.length < 6) {
        alert('비밀번호는 6자리 이상 입력해주세요.');
        return;
      }
      // 이메일 유효성 검사
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        alert('올바른 이메일 형식을 입력해주세요.');
        return;
      }
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
      // 회원가입 유효성 검사
      if (error.code === 'auth/email-already-in-use') {
        alert('중복된 이메일입니다.');
      } else {
        console.log(error);
      }
    }
  };

  const handleSignUpToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // 구글 소셜 로그인
  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      // 구글 로그인 팝업을 통해 인증
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const uid = userCredential.user.uid;
      // uid를 사용하여 로그인 처리
      navigate('/');
    } catch (error) {
      // 로그인 실패 시 에러 처리
      console.log(error);
    }
  };

  return (
    <Container>
      <LeftContainer>
        <Logo src={logoImage} alt="Logo" />
        <Title>Garden Gram</Title>
      </LeftContainer>
      <RightContainer>
        <Description>
          <h1>Welcome to Garden Gram</h1>
          가든 그램에서 싱그러운 반려 식물 이야기를
          <br />
          모두와 함께 실시간으로 나눠보세요.
        </Description>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email"></Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="P / W"
              required
            />
          </FormGroup>
          {isSignUp && (
            <FormGroup>
              <Label htmlFor="nickname"></Label>
              <Input
                type="text"
                id="nickname"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="NickName"
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
                  Cancel
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
          {!isSignUp && (
            <SocialButton type="submit" onClick={handleSignInWithGoogle}>
              <GoogleIcon src={googleIcon} alt="Google Icon" />
              Sign In With Google
            </SocialButton>
          )}
        </Form>
      </RightContainer>
    </Container>
  );
}

export default LoginPage;

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
  width: 45rem;
  height: 100vh;
`;

const Logo = styled.img`
  width: 7rem;
  height: 7rem;
`;

const Title = styled.h1`
  font-size: 6rem;
  margin-top: 0.5rem;
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.25rem;
`;

const Description = styled.div`
  margin-bottom: 1.25rem;
  background-color: #fff;
  width: 31.6rem;
  height: 11.6rem;
  font-size: 1.125rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1.25rem;
`;

const FormGroup = styled.div`
  margin-bottom: 0.625rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 31.6rem;
  height: 3.2rem;
`;

const Button = styled.button`
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  margin-top: 1.25rem;
  width: 15.6rem;
  height: 2.8rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 32.4rem;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 1.25rem;
  width: 31.6rem;
  height: 2.8rem;
`;

const GoogleIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.625rem;
`;
