import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

export const AuthRoute = ({ component: Component, path, exact }) => {
  const loggedIn = useSelector(state => !!state.session.currentUser);
  debugger 
  return (
    <Route path={path} exact={exact} render={(props) => (
      loggedIn ? (
        <Redirect to="/tracks" />
      ) : (
        <Component {...props} />
      )
    )} />
  );
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector(state => !!state.session.currentUser);

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};