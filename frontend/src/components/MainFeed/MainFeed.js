import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Tracks from '../Tracks/Tracks.js';
import NavBar from '../NavBar/SidebarLinks.js';
import Header from '../Header/Header.js';

function MainFeed() {
  const currentUser = useSelector((state) => state.session.currentUser);
  const location = currentUser ? currentUser.location : 'Global';
  const [locationValue, setLocationValue] = useState(location);

  const handleLocationValue = (value) => {
    setLocationValue(value);
  };

  return (
    <div className="mainfeed-container">
      <div className="mainfeed-navbar">
        <NavBar />
      </div>
      <div className="mainfeed-header">
        <Header onLocationValue={handleLocationValue} />
      </div>
      <div className="mainfeed-index">
        <Tracks locationValue={locationValue} />
      </div>
    </div>
  );
}

export default MainFeed;
