const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';


export const setCurrentTrack = (track) => ({
    type: SET_CURRENT_TRACK,
    track
})


const audioReducer = (state = {}, action ) => {
    const nextState = {...state}

    switch (action.type) {
        case SET_CURRENT_TRACK:
            nextState["currentTrack"] = action.track;
            return nextState;
        default:
            return nextState;
    };
};

export default audioReducer;