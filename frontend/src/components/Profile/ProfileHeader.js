import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ bannerUrl, profilePicUrl, followers, following }) => {
  return (
    <div className="profile-header">
      
      <div className="profile-info">
        <div className="follower-info">
          <div>{followers} Followers</div>
          <div>{following} Following</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
