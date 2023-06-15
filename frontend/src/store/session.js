import jwtFetch from './jwt';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";
const RECEIVE_ALL_USERS = 'session/RECEIVE_ALL_USERS';

const receiveAllUsers = users => ({
  type: RECEIVE_ALL_USERS,
  users
});
// Dispatch receiveCurrentUser when a user logs in.
const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

// Dispatch receiveErrors to show authentication errors on the frontend.
const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

// Dispatch logoutUser to clear the session user when a user logs out.
const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

// Dispatch clearSessionErrors to clear any session errors.
export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
});

export const signup = user => startSession(user, 'api/users/register');
export const login = user => startSession(user, 'api/users/login');

const startSession = (userInfo, route) => async dispatch => {
    const { image, username, password, email, name, location } = userInfo;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("location", location);
    formData.append("email", email);

  if (image) formData.append("image", image);
    try {
        const res = await jwtFetch(route, {
            method: "POST",
            // body: JSON.stringify(userInfo)
            body: formData
        });
        const { user, token } = await res.json();
        localStorage.setItem('jwtToken', token);
        return dispatch(receiveCurrentUser(user));
    } catch (err) {
        const res = await err.json();
        if (res.statusCode === 400) {
            return dispatch(receiveErrors(res.errors));
        }
    }
};

export const getCurrentUser = () => async dispatch => {
    const res = await jwtFetch('/api/users/current');
    const user = await res.json();
    return dispatch(receiveCurrentUser(user));
  };

export const getAllUsers = () => async dispatch => {
    try {
      const res = await jwtFetch('/api/users/');
      console.log(res)
      const users = await res.json();
      console.log(users)
      dispatch(receiveAllUsers(users));
    } catch (err) {
      console.error(err);
    }
  };
  

// Remove JWT token from localStorage
export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser());
};

//--------------------------------------------------------//

const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

//--------------------------------------------------------//

const initialState = {
    currentUser: undefined,
    allUsers: []
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case RECEIVE_CURRENT_USER:
        return { ...state, currentUser: action.currentUser };
      case RECEIVE_USER_LOGOUT:
        return initialState;
      case RECEIVE_ALL_USERS:
        return { ...state, allUsers: action.users };
      default:
        return state;
    }
  };
  

export default sessionReducer;