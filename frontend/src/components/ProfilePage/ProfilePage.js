import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Profile from '../Profile/Profile';
import ProfileHeader from '../Profile/ProfileHeader';
import Banner from '../Banner/Banner';
import './ProfilePage.css';

function ProfilePage() {
  const currentUser = useSelector((state) => state.session.currentUser);

  const [filter, setFilter] = useState('All');

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="profile-page-container">
       <div className="banner-container">
        <Banner />
      </div>
      <div className="profile-content-container">
        <div className="profile-header">
          <ProfileHeader onFilterValue={handleFilter} />
        </div>
        <div className="profile-feed">
          <Profile filter={filter} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

