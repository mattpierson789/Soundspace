import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TrackItem.css';
import { setCurrentTrack } from '../../store/audio';
import { repostTrack } from '../../store/tracks';


function TrackItem({ track: {_id, song, artist, genre, plays, likes, reshares, trackUrl, trackImageUrl } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReshared, setIsReshared] = useState(false);
  const user = useSelector((state) => state.session.currentUser);
  const audio = new Audio(trackUrl);
  const dispatch = useDispatch();

  useEffect(() => {
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener('ended', () => {
        setIsPlaying(false);
      });
    };
  }, []);

  const handleReshare = () => {
    if (!isReshared) {
      debugger
      setIsReshared(true)
      dispatch(repostTrack(_id, user._id))
    }
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      dispatch(setCurrentTrack({ song, artist, trackUrl, trackImageUrl }));
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="track-item">
      <h2>{song}</h2>
      <img src={trackImageUrl} alt="Track-Image" />
      <p>Artist: {artist}</p>
      <p>Genre: {genre}</p>
      <p>Plays: {plays}</p>
      <p>Likes: {likes}</p>
      <p>Reshares: {reshares}</p>
      <button onClick={handleReshare}>
        {isReshared ? 'Reshared' : 'Reshare!'}  {/* open to change */}
      </button>
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default TrackItem;
