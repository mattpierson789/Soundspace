import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import { fetchUserFollows, fetchUserFollowing } from '../../store/follow';
import TrackItem from '../Tracks/TrackItem';
// import './Profile.css';
// import ProfileHeader from './ProfileHeader';

function Profile({ filter }) {
  const dispatch = useDispatch();
  const { username } = useParams();

  const currentUser = useSelector(state => state.session.currentUser);
  const userTracks = useSelector(state => state.tracks.usersTracks[username] || []);
  const [isLoading, setIsLoading] = useState(true);

  const filteredTracks =
    filter === 'Original'
      ? userTracks.filter(track => track.artist === username)
      : filter === 'Reposts'
      ? userTracks.filter(track => track.artist !== username)
      : userTracks;

  const userFollowing = useSelector(state => state.follow.all);

  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      await dispatch(fetchUserTracks(username));
      setIsLoading(false);
    };

    fetchTracks();
  }, [dispatch, username]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!currentUser) {
    return <div>Loading...</div>;
  } else if (userTracks.length === 0) {
    return <div className="username-tracks">{username} has no tracks</div>;
  } else {
    return (
      <div className="profile-grid">
        <h2 className="username-tracks-title">All of {username}'s Tracks</h2>
        {filteredTracks.map((track, index) => (
          <TrackItem key={index} track={track} />
        ))}
      </div>
    );
  }
}

export default Profile;
