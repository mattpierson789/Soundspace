import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ bannerUrl, profilePicUrl, followers, following }) => {
  return (
    <div className="profile-header">
      <img className="banner" src={bannerUrl} alt="User banner"/>
      <div className="profile-info">
        {/* <img className="profile-pic" src={profilePicUrl} alt="User profile"/> */}
        <div className="follower-info">
          <div>{followers} Followers</div>
          <div>{following} Following</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
