import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import { fetchUserFollows, fetchUserFollowing } from '../../store/follow';
import TrackItem from '../Tracks/TrackItem';
// import './Profile.css';
// import ProfileHeader from './ProfileHeader';

function Profile({filter}) {
  const dispatch = useDispatch();
  const { username } = useParams();

  const currentUser = useSelector(state => state.session.currentUser);
  const userTracks = useSelector(state => state.tracks.usersTracks[username] || []);


  // const allTracks = useSelector(state => state.tracks.allTracks);

  // const filteredTracks =
  //   filter === 'Original'
  //     ? userTracks.filter((track) => track.artist === username)
  //     : filter === 'Reposts'
  //     ? userTracks.filter((track) => track.artist !== username)
  //     : userTracks;

  // const userFollowing = useSelector(state => state.follow.all);
  const [filteredTracks, setFilteredTracks] = useState([]);
  useEffect(() => {
    const filterTracks = () => {
      if (filter === 'Original') {
        setFilteredTracks(userTracks.filter(track => track.artist === username));
      } else if (filter === 'Reposts') {
        setFilteredTracks(userTracks.filter(track => track.artist !== username));
      } else {
        setFilteredTracks(userTracks);
      }
    };

    dispatch(fetchUserTracks(username))
      .then(filterTracks)
      .catch(error => {
        // Handle error
        console.log(error);
      });

    return () => {
      dispatch(clearTrackErrors()); // Cleanup by clearing any track errors
    };
  }, [dispatch, username, filter, userTracks]);
  
  // const allTracks = useSelector(state => state.tracks.allTracks);
  // const [isFollowing, setIsFollowing] = useState(false);

  // const userFollowers = useSelector(state => state.follow.user);
  // const userFollowing = useSelector(state => state.follow.all);

  // Put in useEffect
  // useEffect(() => {
  //   dispatch(fetchUserTracks(username));
  // }, [dispatch]);

  // useEffect(() => {
  //   const isFollowing = userFollowing.some(user => user.username === username);
  //   setIsFollowing(isFollowing);
  // }, [userFollowing, username]);

  if (!currentUser) {
    return <div>Loading...</div>;
  } else if (userTracks.length === 0) {
    return <div className="username-tracks">{username} has no tracks</div>;
  } else {
  
    // const renderedTracks = [...userTracks];
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
