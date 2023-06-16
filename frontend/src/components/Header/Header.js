import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Header.css';

function Header({ onLocationValue, locationValue, onTrendingPage }) {
  const currentUser = useSelector((state) => state.session.currentUser);
  const currentLocation = currentUser && currentUser.location;
  const [location, setLocation] = useState(currentLocation);
  const [feedType, setFeedType] = useState(true);

  let tracks = useSelector((state) => Object.values(state.tracks.allTracks));

  if (locationValue && locationValue !== "Global") {
    tracks = tracks.filter((track) => track.location && track.location === locationValue);
  }

  const handleClick = (value) => {
    if (location !== value) {
      setLocation(value);
      onLocationValue(value);
    }
  };

  const handleFeedClick = (type) => {
    if (feedType !== type) {
      setFeedType(type);
      onTrendingPage(type);
    }
  };

  return (
    <>
      <div id="logo-header">
        <img className="logo" src="https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/Screen+Shot+2023-06-15+at+11.10-PhotoRoom.png" alt="Logo" />
        <span>Soundspace</span>
        <div className="meet-team">
          {/* <span>Team</span> */}
        </div>
      </div>

      <div className="header-container">
        <div className="header-index-banner">
          {feedType ? (
            <h1>{`Trending ${location ? `in ${location}` : 'around the World'}`}</h1>
          ) : (
            <h1>Following</h1>
          )}
        </div>

        <div className="feed-type-buttons">
          <button onClick={() => handleFeedClick(true)}>Trending</button>
          <button onClick={() => handleFeedClick(false)}>Following</button>
        </div>

        {feedType && (
          <div className="mainfeed-city-filters">
            <button value="NYC" onClick={(e) => handleClick(e.target.value)}>NYC</button>
            <button value="LA" onClick={(e) => handleClick(e.target.value)}>LA</button>
            {/* <button value="ATL" onClick={(e) => handleClick(e.target.value)}>ATL</button> */}
            <button value="" onClick={(e) => handleClick(e.target.value)}>Global</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
