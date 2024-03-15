import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './LoginForm.css';
import { login, clearSessionErrors } from '../../store/session';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const errors = useSelector(state => state.errors.session);
  const currentUser = useSelector(state => state.session.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);
  
  const update = field => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessages(['Please fill in all fields']);
      return;
    }
    dispatch(login({ email, password }));
  };
  if (currentUser) {
    return <Redirect to="/tracks" />;
  }

  const handleDemoUserLogin = () => {
    dispatch(login({ email: 'demo@user.io', password: 'password' }));
  };
  
  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="tag-line">
            <h1 className="form-title">Soundspace</h1>
            <h2 className="form-subtitle">Discover Your Local Scene</h2>
            <h2 className="form-subtitle">Connect with Music in your Backyard</h2>
          </div>
          <label htmlFor="email-input" className="form-label">
            <span className="form-label-text">Email</span>
            <input
              type="text"
              id="email-input"
              className="form-input"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
            <div className="errors">{errors ? errors.email : null}</div>
          </label>
          <label htmlFor="password-input" className="form-label">
            <span className="form-label-text">Password</span>
            <input
              type="password"
              id="password-input"
              className="form-input"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
            <div className="errors">{errors ? errors.password : null}</div>
          </label>
          <input type="submit" value="Log In" className="form-submit-btn" />
          <button type="button" onClick={handleDemoUserLogin} className="form-demo-user-btn">Demo User</button>
          <label className="form-link-label">
            Not a user? Sign Up Here!{' '}
            <Link to="/signup" className="form-link">Sign Up</Link>
          </label>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
