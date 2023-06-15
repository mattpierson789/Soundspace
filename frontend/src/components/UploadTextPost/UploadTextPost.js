// Component
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/posts';
import './PostModal.css';

function CreatePostModal({ closeModal }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.currentUser);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger 

    // Dispatch createPost action with the form data and user ID
    dispatch(createPost({ title, content, userId: currentUser._id }));

    // Clear the form inputs
    setTitle('');
    setContent('');

    // Close the modal
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
          ></textarea>
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostModal;
