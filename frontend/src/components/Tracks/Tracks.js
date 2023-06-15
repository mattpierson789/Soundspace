import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import TrackItem from './TrackItem';
import './Tracks.css';
import { fetchUserFollows, fetchUserFollowing } from '../../store/follow';


function Tracks( {trendingPage, locationValue = null} ) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.currentUser);


  // These are for the following page ONLY
  const following = useSelector(state => Object.values(state.follow.following))
  const filteredFollowing = following.filter(item => item !== null);
  const usernames = filteredFollowing.map(item => item.username);

  let tracks = useSelector(state => Object.values(state.tracks.allTracks));
  debugger
  if (trendingPage === false) {
    debugger
    tracks = tracks.filter(track => usernames.includes(track.artist))
    console.log(tracks)
    locationValue = null
    debugger
    // tracks = tracks.filter((track) => )
  }
  if (locationValue && locationValue !== "Global") {
    tracks = tracks.filter((track) => track.location && (track.location === locationValue));
  }
  
  useEffect(() => {
    debugger
    dispatch(fetchUserFollows(currentUser.username));
    dispatch(fetchUserFollowing(currentUser.username));
  }, []);

  useEffect(() => {
    dispatch(fetchTracks());
    return () => dispatch(clearTrackErrors());
  }, [dispatch]);

  const backgroundImage = locationValue && locationValue !== "Global" ? 
    'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/NYC+MainPage+Background' : 
    'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/NYC+MainPage+Background'; 

  return (
    <div className="tracks-container" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="main-content-tracks-container">
        <div className="main-content-tracks">
          {tracks.length === 0 ? (
            <div className="tracks">There are no Tracks at this location &#128577; </div>
          ) : (
            tracks.map(track => (
              <TrackItem key={track._id} track={track} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Tracks;
