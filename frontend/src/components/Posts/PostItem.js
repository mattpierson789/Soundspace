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
  const users = useSelector((state) => state.session.allUsers);
 
//   const handleEdit = () => {
//     if (!isEditing) {
//       setIsEditing(true);
//     } else {
//       dispatch(updatePost(_id, { title: editedTitle, content: editedContent }));
//       setIsEditing(false);
//     }
//   };

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
            <div className="post-img-name">
            {posterImgUrl && (
              <img className="post-image" src={posterImgUrl} alt="Profile-Image" />
            )}
            <p className="user-post-username">{poster.username}</p>
            </div>
            <div className="main-post-content">
            <h2 className="post-title">{title}</h2>
            <p className="post-content">{content}</p>
            </div>
          </div>
        </>
      )}
   </div>
  );
}

export default PostItem;
