import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';
// const {
//     singleFileUpload,
//     multipleFilesUpload,
//     retrievePrivateFile,
//     singleMulterUpload,
//   } = require("../../backend/awsS3.js");

const RECEIVE_TRACKS = "tracks/RECEIVE_TRACKS";
const RECEIVE_USER_TRACKS = "tracks/RECEIVE_USER_TRACKS";
const RECEIVE_NEW_TRACK = "tracks/RECEIVE_NEW_TRACK";
const RECEIVE_TRACK_ERRORS = "tracks/RECEIVE_TRACK_ERRORS";
const CLEAR_TRACK_ERRORS = "tracks/CLEAR_TRACK_ERRORS";
const REMOVE_TRACK = 'tracks/REMOVE_TRACK';


const receiveTracks = tracks => ({
  type: RECEIVE_TRACKS,
  tracks
});

const removeTrack = (trackId) => ({
  type: REMOVE_TRACK,
  trackId
});

const receiveUserTracks = (tracks, username) => ({
  type: RECEIVE_USER_TRACKS,
  tracks, 
  username 
});

const receiveNewTrack = track => ({
  type: RECEIVE_NEW_TRACK,
  track
});

const receiveErrors = errors => ({
  type: RECEIVE_TRACK_ERRORS,
  errors
});

export const clearTrackErrors = errors => ({
  type: CLEAR_TRACK_ERRORS,
  errors
});

export const fetchTracks = () => async dispatch => {
  try {
    const res = await jwtFetch('/api/tracks');
    const tracks = await res.json();
    dispatch(receiveTracks(tracks));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserTracks = (username) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/tracks/user/${username}`);
    const tracks = await res.json();
    dispatch(receiveUserTracks(tracks, username));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const repostTrack = (id, userId) => async dispatch => {
  console.log(id, userId)
  try {
    const res = await jwtFetch(`/api/tracks/${id}/owner/${userId}`, {
      method: 'POST'
    });
    const tracks = await res.json();
    console.log("tracks:", tracks);
    dispatch(receiveUserTracks(tracks));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
}

export const addCommentToTrack = (trackId, content) =>  async dispatch => {
  console.log(trackId, content);
  debugger
  try {
    const res = await jwtFetch(`/api/tracks/${trackId}/comments`, {
      method: 'POST',
      body: JSON.stringify(content)
    });

    if (res.ok) {
      const responseData = await res.json();
      // Process the responseData as needed
      console.log("responseData:", responseData);
      dispatch(receiveNewTrack(responseData)); // Dispatch the received track data
    } else {
      console.log('Upload failed');
    }
  } catch (err) {
    console.error('An error occurred while uploading the track', err);
    console.log('Upload failed');
    // Handle the error as needed
  }
}

export const uploadTrack = formData => async dispatch => {
    try {
      const res = await jwtFetch('/api/users/upload-music', {
        method: 'POST',
        body: formData
      });
  
      if (res.ok) {
        const responseData = await res.json();
        // Process the responseData as needed
        console.log(responseData);
        dispatch(receiveNewTrack(responseData)); // Dispatch the received track data
      } else {
        console.log('Upload failed');
      }
    } catch (err) {
      console.error('An error occurred while uploading the track', err);
      console.log('Upload failed');
      // Handle the error as needed
    }
  };

  export const deleteTrack = trackId => async dispatch => {
    try {
      await jwtFetch(`/api/tracks/${trackId}`, {
        method: 'DELETE'
      });
      dispatch(removeTrack(trackId));
    } catch (err) {
      // Handle error if needed
    }
  };
// export const uploadTrack = (formData) => async (dispatch) => {
//     try {
//       const res = await jwtFetch('/api/users/upload-music', {
//         method: 'POST',
//         body: formData,
//       });
  
//       const track = await res.json();
//       dispatch(receiveNewTrack(track));
//     } catch (err) {
//       const resBody = await err.json();
//       if (resBody.statusCode === 400) {
//         return dispatch(receiveErrors(resBody.errors));
//       }
//     }
//   };
  

const nullErrors = null;

export const trackErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_TRACK_ERRORS:
      return action.errors;
    case RECEIVE_NEW_TRACK:
    case CLEAR_TRACK_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const initialState = {
  usersTracks: {},
  indexTracks: {},
  allTracks: [],
  newTrack: undefined
};

const tracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TRACKS:
  return {
    ...state,
    allTracks: action.tracks
  };
    case REMOVE_TRACK:
      const { [action.trackId]: removedTrack, ...updatedAllTracks } = state.allTracks;
      const updatedUserTracks = { ...state.usersTracks };
      delete updatedUserTracks[action.trackId];
      return { ...state, allTracks: updatedAllTracks, usersTracks: updatedUserTracks };
      case RECEIVE_USER_TRACKS:
        const { username, tracks } = action;
        const filteredTracks = tracks.filter(track => track.artist === username);
        return {
          ...state,
          allTracks: action.tracks,
          usersTracks: {
            ...state.usersTracks,
            [username]: filteredTracks
          }
        };
    case RECEIVE_NEW_TRACK:
      return {
        ...state,
        usersTracks: { ...state.usersTracks, [action.track.id]: action.track },
        allTracks: [...state.allTracks, action.track],
        newTrack: action.track
      };
    case RECEIVE_USER_LOGOUT:
      return { ...state, usersTracks: {}, newTrack: undefined };
    default:
      return state;
  }
};

export default tracksReducer;
