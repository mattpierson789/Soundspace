import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TrackItem.css';
import { setCurrentTrack, increasePlayCount } from '../../store/audio';
import { repostTrack, deleteTrack, addCommentToTrack} from '../../store/tracks';


function TrackItem({ track: {_id, title, location, artist, genre, plays, likes, reshares, trackUrl, trackImageUrl } }) {
  const [isReshared, setIsReshared] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const user = useSelector((state) => state.session.currentUser);
  const userId = useSelector((state) => state.session.currentUser._id)
  const currentTrack = useSelector((state) => state.audio.currentTrack);
  const dispatch = useDispatch();

  const handleCommentChange = (e) => { // Ensure comment is under 180 chars
    const val = e.target.value
    if (val.length < 180) setCommentValue(val)
  }
  const handleCommentSubmit = (e) => { // Can't submit if no comment exists
    e.preventDefault()
    const content = { commentValue: commentValue, userId: userId };
    if (commentValue) dispatch(addCommentToTrack(_id, content))
  }
  const handleReshare = () => {
    if (!isReshared) {
      setIsReshared(true)
      dispatch(repostTrack(_id, user._id))
    }
  }

  const handleDelete = () => {
    dispatch(deleteTrack(_id));
  }

  const handlePlay = () => {
    if ((currentTrack === null ) || (currentTrack.trackUrl != trackUrl)) dispatch(increasePlayCount(_id))
    dispatch(setCurrentTrack({ title, artist, trackUrl, trackImageUrl }))
  };

  
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
              {/* <button>Save</button> */}
              <button onClick={handleDelete}>Delete Track</button>
              {/* <button onClick={handlePlay}>Play</button> */}

            </div>
          </div>
          <div className="comment-bar">
          <input placeholder='Comment' value={commentValue} onChange={handleCommentChange}></input>
          <button onClick={(e) => handleCommentSubmit(e)}>Add A Comment..</button>
          </div>
        </div>
        {/* <div className="waveform">
          {/* Render the waveform or music bar here */}

      </div>
    );
  };  



export default TrackItem;
