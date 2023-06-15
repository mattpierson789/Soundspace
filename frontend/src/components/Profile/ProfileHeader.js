import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProfileHeader.css';
import { useParams } from 'react-router-dom';
import { followUser, unfollowUser } from '../../store/follow';

const ProfileHeader = ({ bannerUrl, profilePicUrl, followers, following }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.currentUser);
  const { username } = useParams();

  const handleFollow = () => {
    if (isFollowing) {
      dispatch(unfollowUser(currentUser._id, username));
      setIsFollowing(false);
    } else {
      dispatch(followUser(currentUser._id, username));
      setIsFollowing(true);
    }
  };

  return (
    <div className="profile-header">
      
      <div className="profile-info">
        <div className="follower-info">
        <button onClick={handleFollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
          <div>{followers} Followers</div>
          <div>{following} Following</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
