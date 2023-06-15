import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import TrackItem from './TrackItem';
import './Tracks.css';

function Tracks( {locationValue} = null ) {
  const dispatch = useDispatch();
  let tracks = useSelector(state => Object.values(state.tracks.allTracks));
  
  if (locationValue && locationValue !== "Global") {
    tracks = tracks.filter((track) => track.location && (track.location === locationValue));
  }

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
