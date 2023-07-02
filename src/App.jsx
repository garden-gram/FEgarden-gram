import React, { useEffect } from 'react';
import Router from './shared/Router';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getUserData } from './redux/modules/userData';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        // 소셜 로그인 시 닉네임 자동 생성
        if (user.displayName === null) {
          const name = user.email.split('@')[0];
          user.displayName = name;
        }
        if (user.photoURL === null) {
          user.photoURL =
            'https://firebasestorage.googleapis.com/v0/b/gardengram-b2bb2.appspot.com/o/profileImg%2Fblank_profile.svg?alt=media&token=a6ff8689-313f-4608-8498-49e2afa63520';
        }
        const userData = {
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName })
        };
        dispatch(getUserData(userData));
      }
    });
  }, [auth]);
  return <Router />;
}

export default App;
