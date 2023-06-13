import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import React from 'react';
import 'normalize.css';
// import 'bootstrap/dist/css/bootstrap.css';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes'; 
import SideBarLinks from './components/NavBar/SidebarLinks';

import MainPage from './components/MainPage/MainPage'; 
import LoginForm from './components/SessionForms/LoginForm'; 
import SignupForm from './components/SessionForms/SignupForm'; 
import Tracks from './components/Tracks/Tracks';
import Profile from './components/Profile/Profile';
import { getCurrentUser } from './store/session';
import TrackUpload from './components/Tracks/TrackUpload';
import startSession from './store/session';
// import MusicUploadForm from './components/MusicFileUpload/MusicFileUpload';
import MainFeed from './components/MainFeed/MainFeed';
import MusicBar from './components/MusicBar/MusicBar.js';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  
  }, [dispatch]);

  return loaded && (
    <>
      <SideBarLinks />
      <MusicBar/>
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />

        <ProtectedRoute exact path="/tracks" component={MainFeed} />
        <ProtectedRoute exact path="/profile/:username" component={Profile} />
        <ProtectedRoute exact path="/tracks/new" component={TrackUpload} />
        {/* <ProtectedRoute exact path="/upload-track" component={MusicUploadForm} /> */}
      </Switch>
    </>
  );
}

export default App;