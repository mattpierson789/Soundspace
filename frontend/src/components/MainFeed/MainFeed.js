import React, { useState } from 'react';
import Tracks from '../Tracks/Tracks.js';
import NavBar from '../NavBar/SidebarLinks.js';
import Header from '../Header/Header.js';
import { useSelector } from 'react-redux';
import GroupInfo from '../GroupInfo/GroupInfo.js';
import Posts from '../Posts/Posts.js';

// import { fetchTracks } from '../../store/tracks.js';
// import MusicBar from '../MusicBar/MusicBar.js';

function MainFeed() {
    const location = useSelector((state) => state.session.currentUser.location)
    const [locationValue, setLocationValue] = useState(location);
  
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
                <img src='https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/NYC+MainPage+Background.jpg' alt='Background' />
            </div>
            {/* <div>
                <GroupInfo />
            </div> */}
            {/* <div className="mainfeed-musicbar">
                <MusicBar />
            </div> */}
        </div>
    );
}

export default MainFeed;
