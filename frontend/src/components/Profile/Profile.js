import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import TrackItem from '../Tracks/TrackItem';
import './Profile.css';
import React from 'react';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.currentUser);
  const userTracks = useSelector(state => Object.values(state.tracks.currentUser))
  const { username, profileImageUrl } = currentUser;
  
  useEffect(() => {
    dispatch(fetchUserTracks(currentUser._id));
    return () => dispatch(clearTrackErrors());
  }, [currentUser, dispatch]);

  if (userTracks.length === 0) {
    return <div>{currentUser.username} has no Tracks</div>;
  } else {
    return (
      <>
      <h3>
      {profileImageUrl ?
          <img className="profile-image" src={profileImageUrl} alt="profile"/> :
          undefined
        }
        {username}
      </h3>
        <h2>All of {currentUser.username}'s Tracks</h2>
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