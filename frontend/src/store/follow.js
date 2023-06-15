import jwtFetch from "./jwt"

const RECEIVE_FOLLOWS = "users/RECEIVE_FOLLOWS"
const RECEIVE_FOLLOWING = "users/RECEIVE_FOLLOWING"
const RECEIVE_NEW_FOLLOW = "users/RECEIVE_NEW_FOLLOW"
const USER_FOLLOWS = "users/USER_FOLLOWS"
const USER_FOLLOWING = "users/USER_FOLLOWING"
const RECEIVE_FOLLOWER_ERRORS = "users/RECEIVE_FOLLOWER_ERRORS"
const CLEAR_FOLLOWER_ERRORS = "users/CLEAR_FOLLOWER_ERRORS"

const receiveFollows = follows => ({
    type: RECEIVE_FOLLOWS,
    follows
});

const receiveFollowing = following => ({
    type: RECEIVE_FOLLOWING,
    following
});

const receiveNewFollow = follow => ({
    type: RECEIVE_NEW_FOLLOW,
    follow
});

const userFollows = followers => ({
    type: USER_FOLLOWS,
    followers
});

const userFollowing = following => ({
    type: USER_FOLLOWING,
    following
});

const receiveErrors = errors => ({
    type: RECEIVE_FOLLOWER_ERRORS,
    errors
});

const clearFollowerErrors = () => ({
    type: CLEAR_FOLLOWER_ERRORS,
});

const fetchFollowers = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/follow/followers')
        const followers = await res.json();
        dispatch(receiveFollows(followers));
    } catch (err) {
        dispatch(receiveErrors(err))
    }
}

const fetchFollowing = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/follow/following')
        const following = await res.json();
        dispatch(receiveFollowing(following));
    } catch (err) {
        dispatch(receiveErrors(err))
    }
}

const fetchUserFollows = username => async dispatch => {
  debugger
    try {
        const res = await jwtFetch(`/api/users/${username}/followerIds`);
        const followers = await res.json();
        console.log("follows:", followers)
        dispatch(userFollows(followers));
    } catch (err) {
        dispatch(receiveErrors(err));
    }
}

const fetchUserFollowing = username => async dispatch => {
  debugger
    try {
        const res = await jwtFetch(`/api/users/${username}/followingIds`);
        const following = await res.json();
        console.log("following:", following)
        dispatch(userFollowing(following));
    } catch (err) {
        dispatch(receiveErrors(err));
    }
}

const followUser = (currentUserId, username) => async dispatch => {
  console.log('Dispatching followUser with', currentUserId, username);
 
  try {
      const res = await jwtFetch(`/api/users/${currentUserId}/follow/${username}`, { method: 'POST' });
      const data = await res.json();
      dispatch(receiveNewFollow(data));
      // dispatch(fetchUserFollows(username));
      // dispatch(fetchUserFollowing(username));
  } catch (err) {
      dispatch(receiveErrors(err));
  }
}



const unfollowUser = (currentUserId, username) => async dispatch => {
  try {
      const res = await jwtFetch(`/api/users/${currentUserId}/unfollow/${username}`, { method: 'DELETE' });
      const data = await res.json();
      dispatch(receiveNewFollow(data));
      dispatch(fetchUserFollows(username));
      dispatch(fetchUserFollowing(username));
  } catch (err) {
      dispatch(receiveErrors(err));
  }
}


const initialState = {
    all: [],
    followers: [],
    following: [],
    user: {},
    new: undefined,
    errors: null
};

const followReducer = (state = initialState, action) => {
    switch(action.type) {
        case RECEIVE_FOLLOWS:
        case RECEIVE_FOLLOWING:
            return { ...state, all: action.follows };
        case USER_FOLLOWS:
            return { ...state, followers: action.followers}
        // case USER_FOLLOWING:
        //     return { ...state, user: action.following };
        case USER_FOLLOWING:
            return { ...state, following: action.following };
        case RECEIVE_NEW_FOLLOW:
            return { ...state, new: action.follow };
        case RECEIVE_FOLLOWER_ERRORS:
            return { ...state, errors: action.errors };
        case CLEAR_FOLLOWER_ERRORS:
            return { ...state, errors: null };
        default:
            return state;
    }
};

export default followReducer;
export { fetchFollowers, fetchFollowing, fetchUserFollows, fetchUserFollowing, followUser, unfollowUser, receiveNewFollow, clearFollowerErrors };
