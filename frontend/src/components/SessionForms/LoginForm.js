import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './LoginForm.css';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    dispatch(login({ email, password }));
  };

  if (currentUser) {
    return <Redirect to="/tracks" />;
  }
  
  return (
    <div className="session-form-container">
    <form className="session-form" onSubmit={handleSubmit}>
      <h2>Log In Form</h2>
      <div className="errors">{errors ? errors.email : null }</div>
      <label>
        <span>Email</span>
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
      </label>
      <div className="errors">{errors ? errors.password: null }</div>
      <label>
        <span>Password</span>
        <input type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
      </label>
      <input
        type="submit"
        value="Log In"
        disabled={!email || !password}
      />
      <label>
      Not a user? Sign Up Here!{' '}
      <Link to="/signup">Sign Up</Link>
     </label>
    </form>
   
    </div>
  );
}

export default LoginForm;