import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import MainFeed from '../MainFeed/MainFeed';
import './Header.css';

function Header() {

    const currentLocation = useSelector((state) => state.session.currentUser.location)
    const [location, setLocation] = useState(currentLocation)

    const handleClick = (value) => {
        if (location !== value) setLocation(value);
    }

  return (
    <div className="header-container">
      <div className="search-bar">
        <p>Search For Songs!</p>
      </div>
      <div className="header-index-banner">
        <h1>Your Feed</h1>
      </div>
      <div className="mainfeed-city-filters">
            <button value={"NYC"} onClick={(e) => handleClick(e.target.value)}>NYC</button>
            <button value={"LA"} onClick={(e) => handleClick(e.target.value)}>LA</button>
            <button value={"ATL"} onClick={(e) => handleClick(e.target.value)}>ATL</button>
            <button value={"Global"} onClick={(e) => handleClick(e.target.value)}>Global</button>
        </div>
        {/* <MainFeed location={location} /> */}
    </div>
  );
}

export default Header;

