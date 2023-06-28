import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // 로그인 성공 시 확인
      console.log('로그인 성공:', uid);

      // uid를 사용하여 로그인 처리
      // ...
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

      // uid를 사용하여 회원가입 처리
      // ...
    } catch (error) {
      // 회원가입 실패 시 에러 처리
      console.log(error);
    }
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
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required />
        </div>
        <div>
          P/W
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
        </div>
        <br />
        <button type="button" onClick={handleSubmit}>
          Sign in
        </button>
        <button type="submit" onClick={handleSignUp}>
          Sign up
        </button>
        <br />
        {/* <button type="submit" onClick={handleSignInWithGoogle}>
          Sign in with Google
        </button>
        <button type="submit" onClick={handleSignInWithGitHub}>
          Sign in with GitHub
        </button> */}
      </form>
    </div>
  );
}

export default LoginPage;
