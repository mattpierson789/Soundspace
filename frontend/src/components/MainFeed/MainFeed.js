import React, { useState } from 'react';
import Tracks from '../Tracks/Tracks.js';
import NavBar from '../NavBar/SidebarLinks.js';
import Header from '../Header/Header.js';
import { useParams } from 'react-router-dom';

// import { fetchTracks } from '../../store/tracks.js';
// import MusicBar from '../MusicBar/MusicBar.js';

function MainFeed() {
    const [locationValue, setLocationValue] = useState('');
  
    const handleLocationValue = (value) => {
      setLocationValue(value);
    };
    debugger
    return (
        <div className="mainfeed-container">
            <div className="mainfeed-navbar">
                <NavBar />
            </div>
            <div className="mainfeed-header">
                <Header onLocationValue={handleLocationValue}/>
            </div>
            <div className="mainfeed-index">
                <Tracks locationValue={ locationValue }/>
            </div>
            {/* <div className="mainfeed-musicbar">
                <MusicBar />
            </div> */}
        </div>
    );

}

export default MainFeed;
