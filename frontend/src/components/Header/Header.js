import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Header.css';

function Header({ onLocationValue, locationValue }) {
  const currentLocation = useSelector((state) => state.session.currentUser ? state.session.currentUser.location : 'Global');
  const [location, setLocation] = useState(currentLocation);
  const [feedType, setFeedType] = useState('Trending');

  let tracks = useSelector(state => Object.values(state.tracks.allTracks));

  if (locationValue && locationValue !== 'Global') {
    tracks = tracks.filter((track) => track.location && (track.location === locationValue));
  }

  const handleClick = (value) => {
    if (location !== value) {
      setLocation(value);
      onLocationValue(value);
    }
  };

  const handleFeedClick = (type) => {
    setFeedType(type);
  };

  return (
    <div className="header-container">
      <div id="logo-header">
        <img className="logo" src="https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/Screen+Shot+2023-06-15+at+11.10-PhotoRoom.png" alt="Logo" />
        <span>Soundspace</span>
      </div>

      <div className="header-index-banner">
        <h1>{`Trending ${locationValue !== 'Global' || location === null ? `in ${location}` : 'around the World'}`}</h1>
      </div>

      <div className="feed-type-buttons">
        <button onClick={() => handleFeedClick('Trending')}>Trending</button>
        <button onClick={() => handleFeedClick('Following')}>Following</button>
      </div>

      <div className="mainfeed-city-filters">
        <button value="NYC" onClick={(e) => handleClick(e.target.value)}>NYC</button>
        <button value="LA" onClick={(e) => handleClick(e.target.value)}>LA</button>
        <button value="ATL" onClick={(e) => handleClick(e.target.value)}>ATL</button>
        <button value="Global" onClick={(e) => handleClick(e.target.value)}>Global</button>
      </div>
    </div>
  );
}

export default Header;
