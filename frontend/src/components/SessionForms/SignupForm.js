import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../store/session';
import './SignupForm.css';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const errors = useSelector(state => state.errors.session) || {};
  const [errorMessages, setErrorMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email || !username || !password || password !== password2 || !location) {
      setErrorMessages(['Please fill in all fields']);
      return;
    }

    const user = {
      email,
      username,
      image,
      password,
      name,
      location
    };

    try {
      const response = await dispatch(signup(user));

      if (!response.ok) {
        const data = await response.json();
        setErrorMessages(data.errors || ['Unexpected error. Please try again.']);
      }
    } catch (error) {
      console.error(error);
      setErrorMessages(['Invalid Credentials. Please try again.']);
    }
  };

  const updateFile = e => setImage(e.target.files[0]);

  return (
    <div className="signup-page-container">
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-tag-line">
            <h1 className="form-title">Soundspace</h1>
            <h2 className="form-subtitle">Discover Your Local Scene</h2>
            <h2 className="form-subtitle">Connect with Music in Your Backyard</h2>
          </div>
          <label className="form-label">
            <span className="form-label-text">Email</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="form-input"
            />
            <div className="errors">{errors ? errors.email : null}</div>
          </label>

          <label className="form-label">
            <span className="form-label-text">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="form-input"
            />
          </label>

          <label className="form-label">
            <span className="form-label-text">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="form-input"
            />
          </label>

          <label className="form-label">
            Profile Image
            <div className="profile-image-upload">
              <input type="file" accept=".jpg, .jpeg, .png" onChange={updateFile} />
            </div>
          </label>

          <label className="form-label">
            <span className="form-label-text">Location:</span>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="form-input">
              <option value="">Select Location</option>
              <option value="NYC">NYC</option>
              <option value="LA">LA</option>
              <option value="ATL">ATL</option>
            </select>
          </label>

          <label className="form-label">
            <span className="form-label-text">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-input"
            />
          </label>

          <label className="form-label">
            <span className="form-label-text">Confirm Password</span>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm Password"
              className="form-input"
            />
            <div className="errors">
              {password !== password2 && 'Passwords do not match'}
            </div>
          </label>

          <div className="errors">
            {errorMessages.map((error, idx) => (
              <div key={idx}>{error}</div>
            ))}
          </div>

          <button type="submit" className="form-submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
