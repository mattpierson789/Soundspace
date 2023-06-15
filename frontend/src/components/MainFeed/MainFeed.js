import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Tracks from '../Tracks/Tracks.js';
import NavBar from '../NavBar/SidebarLinks.js';
import Header from '../Header/Header.js';

function MainFeed() {
  const currentUser = useSelector((state) => state.session.currentUser);
  const location = currentUser ? currentUser.location : null;
  const [locationValue, setLocationValue] = useState(location);
  const [trendingPage, setTrendingPage] = useState(true);

  const handleLocationValue = (value) => {
    setLocationValue(value);
  };

  const handleTrendingPage = () => {
    setTrendingPage(!trendingPage);
  };

  return (
    <div className="mainfeed-container">
      <div className="mainfeed-navbar">
        <NavBar />
      </div>
      <div className="mainfeed-header">
        <Header onLocationValue={handleLocationValue} onTrendingPage={handleTrendingPage} />
      </div>
      <div className="mainfeed-index">
        <Tracks locationValue={locationValue} trendingPage={trendingPage} />
        <img src="https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/NYC+MainPage+Background.jpg" alt="Background" />
      </div>
      {/* <div className="mainfeed-musicbar">
          <MusicBar />
      </div> */}
    </div>
  );
}

export default MainFeed;
