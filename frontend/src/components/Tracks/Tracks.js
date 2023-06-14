import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import TrackItem from './TrackItem';
import './Tracks.css';

function Tracks( {location}=null ) {
  const dispatch = useDispatch();
  let tracks = useSelector(state => Object.values(state.tracks.allTracks));
  debugger
  if (location && location !== "Global") {
    debugger
    tracks = tracks.filter((track) => track.location && (track.location === location));
  }

  useEffect(() => {
    dispatch(fetchTracks());
    return () => dispatch(clearTrackErrors());
  }, [dispatch]);

  return (
    <div className="tracks-container">
      <h2 className="trending-title">{`Trending ${location !== 'Global' ? `in ${location}` : 'around the World'}`}</h2>
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
