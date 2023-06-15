import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProfileHeader.css';
import { useParams } from 'react-router-dom';
import { followUser, unfollowUser } from '../../store/follow';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import { fetchUserFollows, fetchUserFollowing } from '../../store/follow';
import CreatePostModal from '../UploadTextPost/UploadTextPost';

const ProfileHeader = ({ onFilterValue, filterValue }) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentUser = useSelector(state => state.session.currentUser);
  const followers = useSelector(state => state.follow.followers.length);
  const following = useSelector(state => state.follow.following.length);
  const [isFollowing, setIsFollowing] = useState(isCurrentUserFollower);
  const userFollowers = useSelector(state => state.follow.followers);
  const isCurrentUserFollower = userFollowers.find(follower => follower._id === currentUser._id) !== undefined;
  const userTracks = useSelector(state => state.tracks.userTracks);

  // const originalTracks = userTracks.filter(track => track.artist === userId);
  // const reposts = userTracks.filter(track => track.artist !== userId);

  const [showModal, setShowModal] = useState(false);

  // const [filter, setFilter] = useState('All');

  const handleFilter = (value) => {
    // setFilter(value);
    onFilterValue(value);
  };


  const handleFollow = () => {
    if (isCurrentUserFollower) {
      dispatch(unfollowUser(currentUser._id, userId));
    } else {
      dispatch(followUser(currentUser._id, userId));
    }
  };

  useEffect(() => {
    dispatch(fetchUserFollows(userId));
    dispatch(fetchUserFollowing(userId));
    // dispatch(fetchUserTracks(userId));
  }, [dispatch, userId]);

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
            {currentUser && currentUser._id !== userId && (
              <button onClick={handleFollow}>
                {isCurrentUserFollower ? 'Unfollow' : 'Follow'}
              </button>
            )}
            <button onClick={openModal}>Create A Post</button>
            <div>{followers} Followers</div>
            <div>{following} Following</div>
          </div>
        </div>
        <div className="track-filters">
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
          <button
            value="All"
            onClick={(e) => onFilterValue(e.target.value)}
            className={filterValue === 'All' ? 'active' : ''}
          >
            All
          </button>
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
