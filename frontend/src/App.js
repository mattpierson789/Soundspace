import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import 'normalize.css';

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
import MainFeed from './components/MainFeed/MainFeed';
import MusicBar from './components/MusicBar/MusicBar';
import MusicUploadForm from './components/MusicFileUpload/MusicFileUpload';
import ProfilePage from './components/ProfilePage/ProfilePage';
import GroupInfo from './components/GroupInfo/GroupInfo';
import { getAllUsers } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));  
    dispatch(getAllUsers())
  }, [dispatch]);

  return loaded && (
    <>
      <SideBarLinks />
      <MusicBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <Route path="/info" component={GroupInfo} />
        <ProtectedRoute exact path="/tracks" component={MainFeed} />
        <ProtectedRoute exact path="/profile/:username" component={ProfilePage} />
        <ProtectedRoute exact path="/tracks/new" component={MusicUploadForm} />
      </Switch>
    </>
  );
}

export default App;