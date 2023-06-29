import React from 'react';
import Header from '../components/Header';
import UserProfile from '../components/UserProfile';
import Sidebar from '../components/Sidebar';

function Profile() {
  return (
    <>
      <Header />
      <Sidebar />
      <UserProfile />
    </>
  );
}

export default Profile;
