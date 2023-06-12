import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import TrackItem from '../Tracks/TrackItem';
import './Profile.css';
import React from 'react'

function Profile () {
  const dispatch = useDispatch();
  const { username } = useParams();  // Get the username from the URL
  
  // Find the user whose username matches the username in the URL
  const currentUser = useSelector(state => state.session.currentUser);
    // state.session.users ? Object.values(state.session.users).find(user => user.username === username) : null

  const userTracks = useSelector(state => 
    currentUser && state.tracks.byUserId && state.tracks.byUserId[currentUser._id] ? 
    Object.values(state.tracks.byUserId[currentUser._id]) : []
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserTracks(currentUser._id));
    }
    return () => dispatch(clearTrackErrors());
  }, [currentUser, dispatch]);

  if (!currentUser) {
    return <div>Loading...</div>;
  } else if (userTracks.length === 0) {
    return <div className="username-tracks">{username} has no Tracks</div>;
  } else {
    return (
      <>
        <h2>All of {username}'s Tracks</h2>
        {userTracks.map(track => (
          <TrackItem
            key={track._id}
            track={track}
          />
        ))}
      </>
    );
  }
}

export default Profile;
