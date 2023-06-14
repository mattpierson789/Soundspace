import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import { followUser, unfollowUser, fetchUserFollows, fetchUserFollowing } from '../../store/follow';
import TrackItem from '../Tracks/TrackItem';
import './Profile.css';
import ProfileHeader from './ProfileHeader';

function Profile() {
  const dispatch = useDispatch();
  const { username } = useParams();

  const currentUser = useSelector(state => state.session.currentUser);
  const currentUserId = currentUser._id;
  const tracksState = useSelector(state => state.tracks);
  const [isFollowing, setIsFollowing] = useState(false); // New state for isFollowing

  const userTracks = useSelector(state =>
    state.tracks.all
      ? Object.values(state.tracks.all).filter(track =>
          track.owner.some(owner => owner.username === username)
        )
      : []
  );

  const userFollowers = useSelector(state => state.follow.user);
  const userFollowing = useSelector(state => state.follow.all);

  const handleFollow = () => {
    if (isFollowing) {
      dispatch(unfollowUser(currentUserId, username));
      setIsFollowing(false); // Update isFollowing state
    } else {
      dispatch(followUser(currentUserId, username));
      setIsFollowing(true); // Update isFollowing state
    }
  };

  useEffect(() => {
    dispatch(fetchUserTracks(username));
    dispatch(fetchUserFollows(username));
    dispatch(fetchUserFollowing(username));
  }, [dispatch, username]);

  useEffect(() => {
    const isFollowing = userFollowing.some(user => user.username === username);
    setIsFollowing(isFollowing); // Set initial value for isFollowing
  }, [userFollowing, username]);

  if (!currentUser) {
    return <div>Loading...</div>;
  } else if (userTracks.length === 0) {
    return <div className="username-tracks">{username} has no Tracks</div>;
  } else {
    return (
      <div className="profile-grid">
        <ProfileHeader />
        <h2>All of {username}'s Tracks</h2>
        <button onClick={handleFollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
        {userTracks.map(track => (
          <TrackItem key={track._id} track={track} />
        ))}
      </div>
    );
  }
}

export default Profile;
