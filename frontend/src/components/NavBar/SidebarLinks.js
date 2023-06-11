import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SidebarLinks.css'; 
import { logout } from '../../store/session';

const SidebarLinks = ({ isLoggedIn }) => {
  
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();

  debugger 
  
  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <ul className="sidebarLinks">
      <li>
        <Link to="/trending">Trending</Link>
      </li>
      <li>
        {isLoggedIn ? (
          <Link to="/your-feed">Your Feed</Link>
        ) : (
          <Link to="/login">Login to view Your Feed</Link>
        )}
      </li>
      <li>
        {isLoggedIn && (
          <button onClick={logoutUser}>Logout</button>
        )}
      </li>
    </ul>
  );
}

export default SidebarLinks;
