import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import TrackItem from './TrackItem';
import './Tracks.css';

function Tracks({ locationValue }) {
  const dispatch = useDispatch();
  let tracks = useSelector(state => Object.values(state.tracks.allTracks));

  if (locationValue && locationValue !== "Global") {
    tracks = tracks.filter((track) => track.location && (track.location === locationValue));
  }

  useEffect(() => {
    dispatch(fetchTracks());
    return () => dispatch(clearTrackErrors());
  }, [dispatch]);

  let backgroundImage = '';

  if (locationValue === 'LA') {
    backgroundImage = 'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/Screen+Shot+2023-06-15+at+1.29-PhotoRoom.png';
  } else if (locationValue === 'NYC') {
    backgroundImage = 'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/NYC+MainPage+Background';
  } else if (locationValue === 'ATL') {
    backgroundImage = 'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/ATL+MainPage+Background';
  } else {
    backgroundImage = 'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/Screen+Shot+2023-06-15+at+1.20-PhotoRoom.png'

  }

  return (
    <div className="tracks-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
