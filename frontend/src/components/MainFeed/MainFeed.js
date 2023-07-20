import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Tracks from '../Tracks/Tracks.js';
import NavBar from '../NavBar/SidebarLinks.js';
import Header from '../Header/Header.js';
import CityBanner from '../CityBanner/CityBanner';
import { useLocation } from 'react-router-dom';

function MainFeed() {
  const currentUser = useSelector((state) => state.session.currentUser);
  const location = currentUser ? currentUser.location : null;
  const [locationValue, setLocationValue] = useState(location);
  const [trendingPage, setTrendingPage] = useState(true);

  const stateLocation = useLocation();
  const prop = stateLocation.state && stateLocation.state.toFollowingPage;
  debugger

  const handleLocationValue = (value) => {
    setLocationValue(value);
  };

  const handleTrendingPage = () => {
    setTrendingPage(!trendingPage);
  };


//   let backgroundImage = '';

//   if (locationValue === 'LA') {
//     backgroundImage = 'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/Screen+Shot+2023-06-15+at+1.29-PhotoRoom.png';
//   } else if (locationValue === 'NYC') {
//     backgroundImage = 'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/NYC+MainPage+Background';
//   } else if (locationValue === 'ATL') {
//     backgroundImage = 'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/ATL+MainPage+Background';
//   } else {
//     backgroundImage = 'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/Screen+Shot+2023-06-15+at+1.20-PhotoRoom.png';
//   }



  return (
    <div className="mainfeed-container">
      <div className="mainfeed-navbar">
        <NavBar />
      </div>
      <div className="mainfeed-banner">
        <CityBanner locationValue={locationValue}/>
      </div>
      <div className="mainfeed-header">
        <Header onLocationValue={handleLocationValue} onTrendingPage={handleTrendingPage} prop={prop} />
      </div>
      <div className="mainfeed-index">
        <Tracks locationValue={locationValue} trendingPage={trendingPage} />
      </div>
    </div>
  );
}

export default MainFeed;
