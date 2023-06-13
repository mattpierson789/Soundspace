import { useState } from 'react';
import React from 'react'
import './TrackItem.css';


function TrackItem ({ track: { song, artist, genre, plays, likes, reshares, mp3Url }}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio(mp3Url);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="track-item">
      <h2>{song}</h2>
      <p>Artist: {artist}</p>
      <p>Genre: {genre}</p>
      <p>Plays: {plays}</p>
      <p>Likes: {likes}</p>
      <p>Reshares: {reshares}</p>
      <button onClick={handlePlayPause}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}

export default TrackItem;
