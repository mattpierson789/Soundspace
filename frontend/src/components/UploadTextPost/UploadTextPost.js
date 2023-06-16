import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/posts';
import './PostModal.css';

function CreatePostModal({ closeModal }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.currentUser);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [closeModal]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch createPost action with the form data and user ID
    dispatch(createPost({ title, content, userId: currentUser._id }));

    // Clear the form inputs
    setTitle('');
    setContent('');

    // Close the modal
    closeModal();
  };

  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>X</button>
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
