import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [nickname, setNickname] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      console.log(auth.currentUser);
      // 로그인 성공 시 확인
      alert('로그인이 완료되었습니다.');

      // uid를 사용하여 로그인 처리
    } catch (error) {
      // 로그인 실패 시 에러 처리
      console.log(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // 사용자 프로필 업데이트
      await updateProfile(userCredential.user, {
        displayName: nickname
      });

      // 회원가입 완료 시 확인
      alert('회원가입이 완료되었습니다.');
      // 입력 필드 초기화
      setEmail('');
      setPassword('');
      setNickname('');

      // 회원가입 후 초기 상태로 돌아가기
      setIsSignUp(false);
      // uid를 사용하여 회원가입 처리
    } catch (error) {
      // 회원가입 실패 시 에러 처리
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
    <div>
      <h2>설명란</h2>
      <form onSubmit={handleSubmit}>
        <div>
          이메일
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required />
        </div>
        <div>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
        </div>
        {isSignUp && (
          <div>
            닉네임
            <input type="text" value={nickname} onChange={handleNicknameChange} placeholder="닉네임" required />
          </div>
        )}
        <br />
        {isSignUp ? (
          <>
            <button type="button" onClick={handleSignUp}>
              완료
            </button>
            <button type="button" onClick={handleSignUpToggle}>
              취소
            </button>
          </>
        ) : (
          <>
            <button type="submit">로그인</button>
            <button type="button" onClick={handleSignUpToggle}>
              회원가입
            </button>
          </>
        )}
      </form>
    </div>
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
