import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import TrackItem from './TrackItem';
import React from 'react';

function Tracks () {
  const dispatch = useDispatch();
  const tracks = useSelector(state => Object.values(state.tracks.all));
  
  useEffect(() => {
    dispatch(fetchTracks());
    return () => dispatch(clearTrackErrors());
  }, [dispatch])

  if (tracks.length === 0) return <div>There are no Tracks</div>;
  
  return (
    <>
      <h2>All Tracks</h2>
      {tracks.map(track=> (
        <TrackItem key={track._id} track={track} />
      ))}
    </>
  );
}

export default Tracks;