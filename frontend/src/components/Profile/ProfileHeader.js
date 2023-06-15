import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProfileHeader.css';
import { useParams } from 'react-router-dom';
import { followUser, unfollowUser } from '../../store/follow';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import { fetchUserFollows, fetchUserFollowing } from '../../store/follow';

// const ProfileHeader = ({ bannerUrl, profilePicUrl, followers, following }) => {
const ProfileHeader = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const currentUser = useSelector(state => state.session.currentUser);
  const followers = useSelector(state => state.follow.followers.length);
  const following = useSelector(state => state.follow.following.length);
  // const isfollowing = useSelector(state => state.follow.followers.length);
  const [isFollowing, setIsFollowing] = useState(isCurrentUserFollower);
  const userFollowers = useSelector(state => state.follow.followers);
  const isCurrentUserFollower = userFollowers.find(follower => follower._id === currentUser._id) !== undefined;  
  debugger
  const handleFollow = () => {
    if (isCurrentUserFollower) {
      dispatch(unfollowUser(currentUser._id, username));
      // setIsFollowing(false);
    } else {
      dispatch(followUser(currentUser._id, username));
      // setIsFollowing(true);
    }
  };

  useEffect(() => {
    dispatch(fetchUserFollows(username));
    dispatch(fetchUserFollowing(username));
  }, [dispatch, username]);
debugger
  return (
    <div className="profile-header">
      
      <div className="profile-info">
        <div className="follower-info">
       
       {currentUser.username !== username &&
          <button onClick={handleFollow}>
            {isCurrentUserFollower ? 'Unfollow' : 'Follow'}
          </button> 
        }
          <div>{followers} Followers</div>
          <div>{following} Following</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
