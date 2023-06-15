import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProfileHeader.css';
import { useParams } from 'react-router-dom';
import { followUser, unfollowUser } from '../../store/follow';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import { fetchUserFollows, fetchUserFollowing } from '../../store/follow';
import CreatePostModal from '../UploadTextPost/UploadTextPost';

// const ProfileHeader = ({ bannerUrl, profilePicUrl, followers, following }) => {
const ProfileHeader = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const currentUser = useSelector(state => state.session.currentUser);
  const followers = useSelector(state => state.follow.followers.length);
  const following = useSelector(state => state.follow.following.length);
  // const isfollowing = useSelector(state => state.follow.followers.length);
  const userFollowers = useSelector(state => state.follow.followers);
  const isCurrentUserFollower = userFollowers.find(follower => follower._id === currentUser._id) !== undefined;  
  const [isFollowing, setIsFollowing] = useState(isCurrentUserFollower);
  debugger

  const [showModal, setShowModal] = useState(false);


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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <div className="profile-header">
      
      <div className="profile-info">
        <div className="follower-info">
       
       {currentUser.username !== username &&
          <button onClick={handleFollow}>
            {isCurrentUserFollower ? 'Unfollow' : 'Follow'}
          </button> 
        }
        <button onClick={openModal}>Create A Post</button>
          <div>{followers} Followers</div>
          <div>{following} Following</div>
        </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            < CreatePostModal closeModal={closeModal}/>
          </div>
        </div>
      )}
     </div>
    </div>
    </>
  );
}

export default ProfileHeader;
