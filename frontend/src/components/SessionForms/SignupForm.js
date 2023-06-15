import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../store/session';
import './SignupForm.css';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

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
      <div className="image-carousel">
        <ImageCarousel />
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up Form</h2>
        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>
        <label>
          <span>Name</span>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
          />
        </label>
        <label>
          <span>Username</span>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
        </label>
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
        <div className="errors">{errors && errors.password}</div>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        <div className="errors">{password !== password2 && 'Confirm Password field must match'}</div>
        <label>
          <span>Confirm Password</span>
          <input
            type="password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            placeholder="Confirm Password"
          />
        </label>

        {errorMessages.map((error, index) => (
          <div key={index} className="errors">
            {error}
          </div>
        ))}

        <input
          type="submit"
          value="Sign Up"
          // disabled={!email || !username || !password || password !== password2 || !location}
        />
      </form>
    </div>
  );
}

export default SignupForm;
