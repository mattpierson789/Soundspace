import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../store/session';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      image,
      password,
      name,
      location
    };

    dispatch(signup(user));
  };

  const updateFile = e => setImage(e.target.files[0]);

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2>Sign Up Form</h2>
      <div className="errors">{errors ? errors.email : null}</div>
      <label>
        <span>Email</span>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
      </label>
      <div className="errors">{errors ? errors.name : null}</div>
      <label>
        <span>Name</span>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
        />
      </label>
      <div className="errors">{errors ? errors.username : null}</div>
      <label>
        <span>Username</span>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        />
      </label>
      <div className="errors">{errors ? errors.profileImageUrl : null}</div>
      <label>
        Profile Image
        <input type="file" accept=".jpg, .jpeg, .png" onChange={updateFile} />
      </label>
      <label>
        <span>Location:</span>
        <select value={location} onChange={e => setLocation(e.target.value)}>
          <option value="">Select Location</option>
          <option value="NYC">NYC</option>
          <option value="LA">LA</option>
          <option value="ATL">ATL</option>
        </select>
      </label>
      <div className="errors">{errors ? errors.password : null}</div>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
      </label>
      <div className="errors">
        {password !== password2 && 'Confirm Password field must match'}
      </div>
      <label>
        <span>Confirm Password</span>
        <input
          type="password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          placeholder="Confirm Password"
        />
      </label>
      <input
        type="submit"
        value="Sign Up"
        disabled={!email || !username || !password || password !== password2 || !location}
      />
    </form>
  );
}

export default SignupForm;
