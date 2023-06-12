import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SidebarLinks.css'; 
import { logout } from '../../store/session';

const SidebarLinks = ({ isLoggedIn }) => {
  
  const loggedIn = useSelector(state => !!state.session.currentUser);
  const dispatch = useDispatch();

  debugger 
  
  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <ul className="sidebarLinks">
      <li>
        {loggedIn ? (
          <Link to="/tracks">Tracks</Link>
        ) : (
          <Link to="/login">Login 2 View</Link>
        )}
      </li>
      <li>
        {loggedIn && (
          <button onClick={logoutUser}>Logout</button>
        )}
      </li>
    </ul>
  );
}

export default SidebarLinks;
