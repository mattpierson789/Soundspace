import React from 'react';
import Tracks from '../Tracks/Tracks.js';
import NavBar from '../NavBar/SidebarLinks.js';
import Header from '../Header/Header.js';
import MusicBar from '../MusicBar/MusicBar.js';

function MainFeed() {

    return (
        <div className="mainfeed-container">
            <div className="mainfeed-navbar">
                <NavBar />
            </div>
            <div className="mainfeed-header">
                <Header />
            </div>
            <div className="mainfeed-index">
                <Tracks />
            </div>
            <div className="mainfeed-musicbar">
                <MusicBar />
            </div>
        </div>
    );

}

export default MainFeed;