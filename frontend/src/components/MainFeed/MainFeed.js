import React, { useState } from 'react';
import Tracks from '../Tracks/Tracks.js';
import NavBar from '../NavBar/SidebarLinks.js';
import Header from '../Header/Header.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTracks } from '../../store/tracks.js';
// import MusicBar from '../MusicBar/MusicBar.js';

function MainFeed() {
const dispatch = useDispatch();
const currentLocation = useSelector((state) => state.session.currentUser.location)
const [location, setLocation] = useState(currentLocation)
debugger
    useEffect(() => {
        debugger
        dispatch(fetchTracks());
        debugger
      }, [dispatch]);
    
    const handleClick = (value) => {
        debugger
        if (location !== value) setLocation(value);
    }

    return (
        <div className="mainfeed-container">
            <div className="mainfeed-navbar">
                <NavBar />
            </div>
            <div className="mainfeed-header">
                <Header />
            </div>
            <button value={"NYC"} onClick={(e) => handleClick(e.target.value)}>NYC</button>
            <button value={"LA"} onClick={(e) => handleClick(e.target.value)}>LA</button>
            <button value={"ATL"} onClick={(e) => handleClick(e.target.value)}>ATL</button>
            <button value={"Global"} onClick={(e) => handleClick(e.target.value)}>Global</button>
         
            <div className="mainfeed-index">
                <Tracks location={ location }/>
            </div>
            {/* <div className="mainfeed-musicbar">
                <MusicBar />
            </div> */}
        </div>
    );

}

export default MainFeed;
