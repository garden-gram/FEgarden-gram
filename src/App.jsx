import React, { useEffect, useState } from 'react';
import Router from './shared/Router';
import { auth } from './firebase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  // 로그인한 유저프로필 가져오기
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const name = user.email.split('@')[0];
          user.displayName = name;
        }
        setCurrentUser({
          nickName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName })
        });
      } else {
        setCurrentUser(null);
      }
      setInit(true);
    });
  }, []);

  return <>{init ? <Router currentUser={currentUser} isLoggedIn={!!currentUser} /> : '로딩중...'}</>;
}

export default App;
