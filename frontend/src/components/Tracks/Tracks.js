import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import TrackItem from './TrackItem';
import './Tracks.css';

function Tracks() {
  const dispatch = useDispatch();
  const tracks = useSelector(state => Object.values(state.tracks.allTracks));

  useEffect(() => {
    dispatch(fetchTracks());
    return () => dispatch(clearTrackErrors());
  }, [dispatch]);

  return (
    <div className="tracks-container">
      <div className="main-content-tracks-container">
        <div className="main-content-tracks">
          {tracks.length === 0 ? (
            <div className="tracks">There are no Tracks</div>
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
