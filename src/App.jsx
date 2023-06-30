import React, { useEffect } from 'react';
import Router from './shared/Router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
function App() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
  }, []);
  return <Router />;
}

export default App;
