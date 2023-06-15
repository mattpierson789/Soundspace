import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProfileHeader.css';
import { useParams, useHistory } from 'react-router-dom';
import { followUser, unfollowUser } from '../../store/follow';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import { fetchUserFollows, fetchUserFollowing } from '../../store/follow';
import CreatePostModal from '../UploadTextPost/UploadTextPost';

// const ProfileHeader = ({ bannerUrl, profilePicUrl, followers, following }) => {
const ProfileHeader = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username } = useParams();
  const currentUser = useSelector(state => state.session.currentUser);
  const followers = useSelector(state => state.follow.followers);
  const following = useSelector(state => state.follow.following);
  // const isfollowing = useSelector(state => state.follow.followers.length);
  const [isFollowing, setIsFollowing] = useState(isCurrentUserFollower);
  const userFollowers = useSelector(state => state.follow.followers);
  const isCurrentUserFollower = userFollowers.find(follower => follower._id === currentUser._id) !== undefined;

  const [showModal, setShowModal] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followType, setFollowType] = useState('following');

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

  const openFollowModal = () => {
    setShowFollowModal(true);
  };

  const handleShowPage = (user) => {
    debugger
    if (user.username) {history.push(`/profile/${user.username}`) ; setShowFollowModal(false); }
  }
  debugger
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
            <div onClick={openFollowModal}>{followers.length} Followers</div>
            <div onClick={openFollowModal}>{following.length} Following</div>
          </div>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                < CreatePostModal closeModal={closeModal} />
              </div>
            </div>
          )}

          {showFollowModal && (
            <div className='follow-modal'>
              <div className='follow-modal-content'>
                <div className='modal-header'>
                  <button
                    className={`toggle-button ${followType === 'followers' ? 'active' : ''}`}
                    onClick={() => setFollowType('followers')}
                  >
                    Followers
                  </button>
                  <button
                    className={`toggle-button ${followType === 'following' ? 'active' : ''}`}
                    onClick={() => setFollowType('following')}
                  >
                    Following
                  </button>
                </div>
                <div className='modal-body'>
                  {followType === 'followers' && (
                    <div className='followers-content'>
                      {followers.map((follower) => {
                        if (follower) {
                          return (
                            <div className='followers-content-box' key={follower._id} onClick={() => handleShowPage(follower)}>
                              <img className='followers-content-img' src={follower.profileImageUrl} alt={follower.username} />
                              <span className='followers-content-box-handle'>{follower.username}</span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                  {followType === 'following' && (
                    <div className='following-content'>
                      {following.map((celeb) => {
                        if (celeb) {
                          return (
                            <div className='followers-content-box' key={celeb._id} onClick={() => handleShowPage(celeb)}>
                              <img className='followers-content-img' src={celeb.profileImageUrl} alt={celeb.username} />
                              <span className='followers-content-box-handle'>{celeb.username}</span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;


