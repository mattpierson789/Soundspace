// Action Types
const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
const SET_PAST_TRACK = 'SET_PAST_TRACK';
const SET_NEXT_TRACK = 'SET_NEXT_TRACK';

// Action Creator
export const setCurrentTrack = (track) => ({
  type: SET_CURRENT_TRACK,
  payload: track
});

export const setPastTrack = (prevTrack) => ({
  type: SET_PAST_TRACK,
  payload: prevTrack
})

export const setNextTrack = (nextTrack) => ({
  type: SET_NEXT_TRACK,
  payload: nextTrack
})

// Reducer
const initialState = {
  currentTrack: null,
  prevTrack: null, 
  nextTrack: null 
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload
      };
      case SET_PAST_TRACK:
        return {
          ...state,
          pastTrack : action.payload
        };
      case SET_NEXT_TRACK:
        return {
            ...state,
          nextTrack : action.payload
      };
    default:
      return state;
  }
};

export default audioReducer;

