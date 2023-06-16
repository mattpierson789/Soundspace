import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCommentsByTrackId, addCommentToTrack } from '../../store/tracks';

function CommentsModal({ trackId, closeModal }) {
  const dispatch = useDispatch();
  const allTracks = useSelector((state) => state.tracks.allTracks);
  const [commentValue, setCommentValue] = useState('');

  useEffect(() => {
    dispatch(getCommentsByTrackId(trackId));
  }, [dispatch, trackId]);

  const handleCommentChange = (e) => {
    const val = e.target.value;
    if (val.length < 180) setCommentValue(val);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const content = { commentValue };
    if (commentValue) {
      dispatch(addCommentToTrack(trackId, content));
      setCommentValue('');
    }
  };

  const track = allTracks.find((track) => track._id === trackId);
  const comments = track && track.comments ? track.comments : [];

  return (
    <div className="comments-modal">
      <div className="comments-modal-overlay" onClick={closeModal}></div>
      <div className="comments-modal-content">
        <h2>Comments</h2>
        {comments.length > 0 ? (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment._id} className="comment-item">
                {comment.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentValue}
            onChange={handleCommentChange}
          />
          <button type="submit">Add Comment</button>
        </form>
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default CommentsModal;
