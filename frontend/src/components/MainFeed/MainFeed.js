import React from 'react';
import Tracks from '../Tracks/Tracks.js';
import NavBar from '../NavBar/SidebarLinks.js';
import Header from '../Header/Header.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTracks } from '../../store/tracks.js';
// import MusicBar from '../MusicBar/MusicBar.js';

function MainFeed() {
const dispatch = useDispatch();

    useEffect(() => {
        debugger
        dispatch(fetchTracks());
        debugger
      }, [dispatch]);

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
            {/* <div className="mainfeed-musicbar">
                <MusicBar />
            </div> */}
        </div>
    );

}

export default MainFeed;