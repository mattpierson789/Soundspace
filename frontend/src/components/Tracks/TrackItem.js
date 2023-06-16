import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TrackItem.css';
import { setCurrentTrack } from '../../store/audio';
import { repostTrack, deleteTrack, addCommentToTrack} from '../../store/tracks';
import { useHistory } from 'react-router-dom';


function TrackItem({ track: {_id, title, location, artist, genre, plays, likes, reshares, trackUrl, trackImageUrl } }) {
  const [isReshared, setIsReshared] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const user = useSelector((state) => state.session.currentUser);
  const userId = useSelector((state) => state.session.currentUser ? state.session.currentUser._id : null)
  const dispatch = useDispatch();
  const history = useHistory();

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
    dispatch(setCurrentTrack({ title, artist, trackUrl, trackImageUrl }))
  };

  const userShowPageRoute = () => {
    history.push(`/profile/${artist}`); 
  };

  return (
      <div className="track-item">
        <img className="track-image" onClick={handlePlay} src={trackImageUrl} />
        <div className="track-details">
          <h2 className="title">{title}</h2>
          <p className="artist" onClick={userShowPageRoute}>{artist}</p>
          <p className="genre">{genre}</p>
          <div className="track-stats">
          <p className="plays">Plays: {plays}</p>
          {/* <p className="likes">Likes: {likes}</p> */}
          <p className="reshares">Reshares: {reshares}</p>
          </div>
          <div className="track-buttons-container">
            <div className="track-buttons">
              <button onClick={handleReshare}>{isReshared ? 'Reshared' : 'Repost'}</button>
              <button onClick={handleDelete}>Delete Track</button>
              <button onClick={handlePlay}>Play</button>
            </div>
          </div>
          <div className="comment-bar">
          <input placeholder='Comment' value={commentValue} onChange={handleCommentChange}></input>
          <button onClick={(e) => handleCommentSubmit(e)}>Add A Comment..</button>
          </div>
        </div>
      </div>
    );
};  

export default TrackItem;

