import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes'; 
import NavBar from './components/NavBar/SidebarLinks';

import MainPage from './components/MainPage/MainPage'; 
import LoginForm from './components/SessionForms/LoginForm'; 
import SignupForm from './components/SessionForms/SignupForm'; 
import Tracks from './components/Tracks/Tracks';
import Profile from './components/Profile/Profile';
import { getCurrentUser } from './store/session';
import TrackUpload from './components/Tracks/TrackUpload';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />

        <ProtectedRoute exact path="/tracks" component={Tracks} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/tracks/new" component={TrackUpload} />
      </Switch>
    </>
  );
}

export default App;