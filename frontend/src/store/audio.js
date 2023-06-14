import jwtFetch from './jwt';
// Action Types
const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';

// Action Creator
export const setCurrentTrack = (track) => ({
  type: SET_CURRENT_TRACK,
  payload: track
});

// Thunk action creator
export const increasePlayCount = (trackId) => async dispatch => {
  console.log("trackId:", trackId);
  try {
    const res = await jwtFetch(`/api/tracks/${trackId}/plays`, {
      method: 'POST'
    });

    if (res.ok) {
      const responseData = await res.json();
      console.log(responseData);
      debugger
      // dispatch(receiveNewTrack(responseData)); // Dispatch the received track data
    } else {
      console.log('Upload failed');
    }
  } catch (err) {
    console.error('An error occurred while uploading the track', err);
    console.log('Upload failed');
    // Handle the error as needed
  }
}
// Reducer
const initialState = {
  currentTrack: null
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload
      };
    default:
      return state;
  }
};

export default audioReducer;

