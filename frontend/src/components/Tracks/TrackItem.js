import React from 'react';
import { useDispatch } from 'react-redux';
import './TrackItem.css';
import { setCurrentTrack } from '../../store/audio';

function TrackItem({ track: { title, artist, genre, plays, likes, reshares, trackUrl, trackImageUrl } }) {
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(setCurrentTrack({ title, artist, trackUrl, trackImageUrl }));
  };

  return (
    <div className="track-item">
      <h2>{title}</h2>
      <img src={trackImageUrl} alt="Track-Image" />
      <p>Artist: {artist}</p>
      <p>Genre: {genre}</p>
      <p>Plays: {plays}</p>
      <p>Likes: {likes}</p>
      <p>Reshares: {reshares}</p>
      <button onClick={handlePlay}>Play</button>
    </div>
  );
}

export default TrackItem;
