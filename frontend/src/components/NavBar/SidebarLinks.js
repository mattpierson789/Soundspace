import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SidebarLinks.css';
import { logout } from '../../store/session';
import UserInfo from '../UserInfo/UserInfo';
import MusicUploadForm from '../MusicFileUpload/MusicFileUpload';

const SidebarLinks = ({ isLoggedIn }) => {
  const loggedIn = useSelector(state => !!state.session.currentUser);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showModal && !e.target.closest('.modal-content')) {
        setShowModal(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [showModal]);

  return (
    <div className="container">
      <ul className="sidebarLinks">
        <li>
          {loggedIn ? (
            <>
              <div id="links-container">
                <UserInfo />
                <Link to="/tracks">Trending</Link>
                <Link to="/tracks">Feed</Link>
                <button onClick={openModal}>Upload Track</button>
                <li>
                  {loggedIn && <button onClick={logoutUser}>Logout</button>}
                </li>
              </div>
            </>
          ) : (
            <>
              <div>
              {/* <h2 className="welcome-message">Welcome to Soundspace</h2> */}
              <div id= 'links-container'>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/tracks">Trending</Link>
                <Link to="/tracks">Feed</Link>
                <Link to="/tracks">Following</Link>
              </div>
              </div>
            </>
          )}
        </li>
      </ul>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <MusicUploadForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarLinks;
