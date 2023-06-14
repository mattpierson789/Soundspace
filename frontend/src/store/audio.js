// Action Types
const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';

// Action Creator
export const setCurrentTrack = (track) => ({
  type: SET_CURRENT_TRACK,
  payload: track
});

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

