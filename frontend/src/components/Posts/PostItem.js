import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PostItem.css';
import { updatePost } from '../../store/posts';

function PostItem({ post }) {
  const { _id, title, content, poster, posterImgUrl } = post || {}; // Destructure the post object
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUser);

  const handleEdit = () => {
    if (!isEditing && currentUser && currentUser._id === poster) {
      setIsEditing(true);
    } else if (isEditing && currentUser && currentUser._id === poster) {
      dispatch(updatePost(_id, { title: editedTitle, content: editedContent }));
      setIsEditing(false);
    }
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  return (
    <div className="post-container">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            className="post-edit-title"
          />
          <textarea
            value={editedContent}
            onChange={handleContentChange}
            className="post-edit-content"
          />
        </>
      ) : (
        <>
          <div className="track-item">
            {posterImgUrl && (
              <img className="post-image" src={posterImgUrl} alt="Profile-Image" />
            )}
            <h2 className="post-title">{title}</h2>
            <p className="post-content">{content}</p>
          </div>
        </>
      )}
      <div className="post-buttons">
        {isEditing ? (
          <button onClick={handleEdit}>Save</button>
        ) : (
          <>
            {currentUser && currentUser._id === poster && <button onClick={handleEdit}>Edit</button>}
          </>
        )}
      </div>
    </div>
  );
}

export default PostItem;
