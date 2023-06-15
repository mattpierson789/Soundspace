import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import { fetchUserFollows, fetchUserFollowing } from '../../store/follow';
import TrackItem from '../Tracks/TrackItem';
import './Profile.css';
import ProfileHeader from './ProfileHeader';

function Profile() {
  const dispatch = useDispatch();
  const { username } = useParams();

  const currentUser = useSelector(state => state.session.currentUser);
  const currentUserId = currentUser._id;
  const userTracks = useSelector(state => state.tracks.usersTracks[username] || []);
  const allTracks = useSelector(state => state.tracks.allTracks);
  const [isFollowing, setIsFollowing] = useState(false);

  const userFollowers = useSelector(state => state.follow.user);
  const userFollowing = useSelector(state => state.follow.all);

  // Put in useEffect
  dispatch(fetchUserTracks(username));

  // useEffect(() => {
  //   const isFollowing = userFollowing.some(user => user.username === username);
  //   setIsFollowing(isFollowing);
  // }, [userFollowing, username]);

  if (!currentUser) {
    return <div>Loading...</div>;
  } else if (userTracks.length === 0) {
    return <div className="username-tracks">{username} has no tracks</div>;
  } else {
    // const userRepostedTracks = allTracks.filter(track =>
    //   track.owner.some(owner => owner.username === username)
    // );
    const renderedTracks = [...userTracks];

    return (
      <div className="profile-grid">
        <h2 className="username-tracks-title">All of {username}'s Tracks</h2>
        {renderedTracks.map((track, index) => (
          <TrackItem key={index} track={track} />
        ))}
      </div>
    );
  }
}

export default Profile;
