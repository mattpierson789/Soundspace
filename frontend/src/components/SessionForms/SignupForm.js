import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../store/session';
import React from 'react';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [location, setLocation] = useState('');
  const errors = useSelector(state => state.errors.session);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'name':
        setState = setName;
        break;
      case 'location':
        setState = setLocation;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      image,
      password,
      name
    };

    dispatch(signup(user)); 
  }

  const updateFile = e => setImage(e.target.files[0]);

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2>Sign Up Form</h2>
      <div className="errors">{errors ? errors.email: null}</div>
      <label>
        <span>Email</span>
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
      </label>
      <div className="errors">{errors ? errors.name: null }</div>
      <label>
        <span>Name</span>
        <input type="text"
          value={name}
          onChange={update('name')}
          placeholder="Name"
        />
      </label>
      <div className="errors">{errors ? errors.username : null }</div>
      <label>
        <span>Username</span>
        <input type="text"
          value={username}
          onChange={update('username')}
          placeholder="Username"
        />
      </label>
      <div className="errors">{errors ? errors.profileImageUrl: null}</div>
      <label>
        Profile Image
        <input 
        type="file" 
        accept=".jpg, .jpeg, .png" 
        onChange={updateFile}
        />
      </label>
      <label>
        <span>Location</span>
        <input type="text"
          value={location}
          onChange={update('location')}
          placeholder="Location"
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
      <div className="errors">
        {password !== password2 && 'Confirm Password field must match'}
      </div>
      <label>
        <span>Confirm Password</span>
        <input type="password"
          value={password2}
          onChange={update('password2')}
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
