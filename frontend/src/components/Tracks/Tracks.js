import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import TrackItem from './TrackItem';
import './Tracks.css';

function Tracks() {
  const dispatch = useDispatch();
  const tracks = useSelector(state => Object.values(state.tracks.all));

  useEffect(() => {
    dispatch(fetchTracks());
    return () => dispatch(clearTrackErrors());
  }, [dispatch]);

  return (
    <div className="tracks-container">
      <h2 className="trending-title">Trending</h2>
      <div className="main-content">
        <h2>This is the Track Index</h2>
        {tracks.length === 0 ? (
          <div id="tracks">There are no Tracks</div>
        ) : (
          tracks.map(track => (
            <TrackItem key={track._id} track={track} />
          ))
        )}
      </div>
    </div>
  );
}

export default Tracks;
