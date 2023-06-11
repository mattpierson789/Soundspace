import React from 'react';
import UserInfo from './UserInfo'; 
import SidebarLinks from './SidebarLinks'; 
import './Sidebar.css'; 

const Sidebar = ({ isLoggedIn }) => {
  return (
    <div className="sidebar">
      <UserInfo />
      <SidebarLinks isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default Sidebar;
