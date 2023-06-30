import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../pages/Auth';
import Main from '../pages/Main';
import Profile from '../pages/Profile';
function Router({ currentUser, isLoggedIn }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/mypage/profile/:id" element={<Profile currentUser={currentUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
