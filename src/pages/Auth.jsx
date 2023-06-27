import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;

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
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;

      // uid를 사용하여 회원가입 처리
      // ...
    } catch (error) {
      // 회원가입 실패 시 에러 처리
      console.log(error);
    }
  };
  // 로그인 처리 에러...
  //   if (isSignup) { 오류발생

  // uid로 넘겨줘야됨

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
        <button type="submit">Sign in</button>
        <button type="submit">Sign up</button>
        <br />
        <button type="submit">Sign in with</button>
        <br />
        <button type="submit">Sign in with</button>
      </form>
    </div>
  );
}

export default LoginPage;
