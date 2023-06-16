import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProfileHeader.css';
import { useParams, useHistory } from 'react-router-dom';
import { followUser, unfollowUser, fetchUserFollows, fetchUserFollowing } from '../../store/follow';
import CreatePostModal from '../UploadTextPost/UploadTextPost';

const ProfileHeader = ({ onFilterValue, filterValue }) => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const history = useHistory();
  const currentUser = useSelector(state => state.session.currentUser);
  const userFollowers = useSelector(state => state.follow.followers);
  const showUser = useSelector(state => state.session.allUsers.find(user => user.username === username ));
  const followers = useSelector(state => state.follow.followers);
  const following = useSelector(state => state.follow.following);

  const [isFollowing, setIsFollowing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followType, setFollowType] = useState('following');

  const isMountedRef = useRef(null);

  const handleFollow = () => {
    if (isFollowing) {
      dispatch(unfollowUser(currentUser._id, username));
    } else {
      dispatch(followUser(currentUser._id, username));
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    dispatch(fetchUserFollows(username)).then(() => {
      dispatch(fetchUserFollowing(username)).then(() => {
        const isCurrentUserFollower = userFollowers.find(follower => follower._id === currentUser._id) !== undefined;
        if(isMountedRef.current) {
          setIsFollowing(isCurrentUserFollower);
        }
      });
    });
    return () => {
      isMountedRef.current = false;
    }
  }, [dispatch, username, userFollowers, currentUser]);

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
    if (user.username) {
      history.push(`/profile/${user.username}`);
      setShowFollowModal(false);
    }
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showModal && !e.target.closest('.modal-content')) {
        setShowModal(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [showModal]);

  return (
    <>
      <div className="profile-header">
        <div className="profile-info">
          {showUser && <img className="showPage-profilePageImg" src={showUser.profileImageUrl} />}
          <div className="follower-info">
            {currentUser.username !== username && (
              <button onClick={handleFollow}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
            {username === currentUser.username && <button onClick={openModal}>Create A Post</button>}
            <div onClick={openFollowModal}>{followers.length} Followers</div>
            <div onClick={openFollowModal}>{following.length} Following</div>
          </div>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <CreatePostModal closeModal={closeModal} />
              </div>
            </div>
          )}
  
          {showFollowModal && (
            <div className="follow-modal">
              <div className="follow-modal-content">
                <div className="modal-header">
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
                <div className="modal-body">
                  {followType === 'followers' && (
                    <div className="followers-content">
                      {followers.map((follower) => {
                        if (follower) {
                          return (
                            <div className="followers-content-box" key={follower._id} onClick={() => handleShowPage(follower)}>
                              <img className="followers-content-img" src={follower.profileImageUrl} alt={follower.username} />
                              <span className="followers-content-box-handle">{follower.username}</span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                  {followType === 'following' && (
                    <div className="following-content">
                      {following.map((celeb) => {
                        if (celeb) {
                          return (
                            <div className="followers-content-box" key={celeb._id} onClick={() => handleShowPage(celeb)}>
                              <img className="followers-content-img" src={celeb.profileImageUrl} alt={celeb.username} />
                              <span className="followers-content-box-handle">{celeb.username}</span>
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
          <div className="track-filters">
            <button
              value="All"
              onClick={(e) => onFilterValue(e.target.value)}
              className={filterValue === 'All' ? 'active' : ''}
            >
              All
            </button>
            <button
              value="Original"
              onClick={(e) => onFilterValue(e.target.value)}
              className={filterValue === 'Original' ? 'active' : ''}
            >
              Original
            </button>
            <button
              value="Reposts"
              onClick={(e) => onFilterValue(e.target.value)}
              className={filterValue === 'Reposts' ? 'active' : ''}
            >
              Reposts
            </button>
          </div>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <CreatePostModal closeModal={closeModal} />
            </div>
          </div>
        )}
      </div>
    </>
  );
  
};

export default ProfileHeader;
