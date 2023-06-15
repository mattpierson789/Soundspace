import React, { useState }from 'react';
import { useSelector } from 'react-redux';
import Profile from '../Profile/Profile';
import ProfileHeader from '../Profile/ProfileHeader';
import './ProfilePage.css'

function ProfilePage() {
  const currentUser = useSelector((state) => state.session.currentUser);
  // const []
  return (
    <div className="profile-page-container">
      <div className="profile-header-main">
        <ProfileHeader />
      </div>
      <div className="profile-feed">
        <Profile />
      </div>
    </div>
  );
}

export default ProfilePage;
