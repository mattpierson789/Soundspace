import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './SigninForm.css';
import { login, clearSessionErrors } from '../../store/session';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

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
  
  return (
    <div className="login-page-container">
      <div className="image-carousel-container">
        <ImageCarousel className="image-carousel"/>
      </div>

      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Soundspace</h1>
          <h2>Log In Form</h2>
       
          <label>
            <span>Email</span>
            <input
              type="text"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
            <div className="errors">{errors ? errors.email : null}</div>
          </label>
      
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
            <div className="errors">{errors ? errors.password : null}</div>
          </label>
      
          <input type="submit" value="Log In" />

          <label>
            Not a user? Sign Up Here!{' '}
            <Link to="/signup">Sign Up</Link>
          </label>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
