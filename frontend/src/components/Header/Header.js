import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Header.css';

function Header( {onLocationValue} ) {

    const currentLocation = useSelector((state) => state.session.currentUser.location)
    const [location, setLocation] = useState(currentLocation)
    const [feedType, setFeedType] = useState("Trending")

    const handleClick = (value) => {
        if (location !== value) {
          setLocation(value);
          onLocationValue(value);
        } 
    }

    const handleFeedClick = (type) => {
      setFeedType(type);
    }
    
    // use feedType state to switch between feeds

  return (
    <div className="header-container">
      <div className="header-index-banner">
        <h1>Your Feed</h1>
      </div>
      <div className="feed-type-buttons">
            <button onClick={() => handleFeedClick("Trending")}>Trending</button>
            <button onClick={() => handleFeedClick("Following")}>Following</button>
      </div>
      <div className="mainfeed-city-filters">
            <button value={"NYC"} onClick={(e) => handleClick(e.target.value)}>NYC</button>
            <button value={"LA"} onClick={(e) => handleClick(e.target.value)}>LA</button>
            <button value={"ATL"} onClick={(e) => handleClick(e.target.value)}>ATL</button>
            <button value={"Global"} onClick={(e) => handleClick(e.target.value)}>Global</button>
        </div>
    </div>
  );
}

export default Header;
