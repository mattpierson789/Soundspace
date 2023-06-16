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
{/* /* <div id='logo-header'>
  <img className='logo' src='https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/Screen+Shot+2023-06-15+at+11.10-PhotoRoom.png' />
  <span>Soundspace</span>
  <div className='meet-team'>
  <span>Team</span> */}

    <div className="header-container">

    {feedType &&
        <div className="mainfeed-city-filters">
            <button value={"NYC"} class="d-1" onClick={(e) => handleClick(e.target.value)}>NYC</button>
            <button value={"LA"} class="d-2" onClick={(e) => handleClick(e.target.value)}>LA</button>
            <button value={"Global"} class="d-3" onClick={(e) => handleClick(e.target.value)}>Global</button>
        </div>
      }


    {/* <div className="header-index-banner"> */}
      {/* {feedType
    //   ? <h1>{`Trending ${location !== 'Global' || location === null ? `in ${location}` : 'around the World'}`}</h1>  */}
      {/* <h1>Following</h1> */}
      {/* </div> */}
      
      <div className="feed-type-buttons">
            <button onClick={() => handleFeedClick(true)}>Trending</button>
            <button onClick={() => handleFeedClick(false)}>Following</button>
      </div>


    </div>
    </>
  );
}

export default Header;
