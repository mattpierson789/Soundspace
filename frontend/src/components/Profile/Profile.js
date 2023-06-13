import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import TrackItem from '../Tracks/TrackItem';
import './Profile.css';
import React from 'react';  

function Profile () {
  const dispatch = useDispatch();
  const { username } = useParams();

  const currentUser = useSelector(state => state.session.currentUser);

  const tracksState = useSelector(state => state.tracks);
  debugger

  const userTracks = Object.values(tracksState.all)
  .filter(track => track.owner.some(owner => owner.username === username));


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
