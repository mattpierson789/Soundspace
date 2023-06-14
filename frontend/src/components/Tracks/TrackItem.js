import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TrackItem.css';
import { setCurrentTrack } from '../../store/audio';
import { repostTrack, deleteTrack } from '../../store/tracks';


<<<<<<< HEAD
function TrackItem({ track: {_id, title, location, artist, genre, plays, likes, reshares, trackUrl, trackImageUrl } }) {
=======
function TrackItem({ track: {_id, title, artist, genre, plays, likes, reshares, trackUrl, trackImageUrl } }) {
>>>>>>> e77cc3e (Update musicbar)
  const [isReshared, setIsReshared] = useState(false);
  const user = useSelector((state) => state.session.currentUser);
  const dispatch = useDispatch();


  const handleReshare = () => {
    if (!isReshared) {
      debugger
      setIsReshared(true)
      dispatch(repostTrack(_id, user._id))
    }
  }

<<<<<<< HEAD
  const handleDelete = () => {
    dispatch(deleteTrack(_id));
  }


  return (
      <div className="track-item">
        <img className="track-image" src={trackImageUrl} alt="Track-Image" />
        <div className="track-details">
          <h2 className="title">{title}</h2>
          <p className="artist">{artist}</p>
          <p className="genre">{genre}</p>
          <div className="track-stats">
          <p className="plays">Plays: {plays}</p>
          <p className="likes">Likes: {likes}</p>
          <p className="reshares">Reshares: {reshares}</p>
          </div>
          <div className="track-buttons-container">
          <div className="track-buttons">
            <button>Like</button>
            <button onClick={handleReshare}>{isReshared ? 'Reshared' : 'Repost'}</button>
            <button>Save</button>
            <button onClick={handleDelete}>Delete Track</button>
          </div>
          </div>
        </div>
        {/* <div className="waveform">
          {/* Render the waveform or music bar here */}

      </div>
    );
  };  
=======
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
      <button onClick={handleReshare}>
        {isReshared ? 'Reshared' : 'Reshare!'}  
      </button>
      <button onClick={handlePlay}>Play</button>
    </div>
  );
}
>>>>>>> e77cc3e (Update musicbar)

export default TrackItem;
