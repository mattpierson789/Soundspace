
import jwtFetch from './jwt';

// Action Constants
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';

// Action Creators
export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  payload: posts,
});

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  payload: post,
});

export const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId,
});

export const updatePost = (postId, updatedData) => ({
  type: UPDATE_POST,
  payload: { postId, updatedData },
});

// Thunk Action Creators
export const fetchPosts = () => async (dispatch) => {
  try {
    // Make an API request to fetch the posts
    const response = await jwtFetch('/api/posts');
    console.log(response)
    const data = await response.json();
    console.log(data)
    debugger 

    // Dispatch the receivePosts action with the fetched posts
    dispatch(receivePosts(data));
    debugger 
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    const response = await jwtFetch('/api/users/upload-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    dispatch(receivePost(data.post));
  } catch (error) {
    console.error('Failed to create post:', error);
  }
};

export const removePost = (postId) => async (dispatch) => {
  try {
    await jwtFetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    dispatch(deletePost(postId));
  } catch (error) {
    console.error('Failed to delete post:', error);
  }
};

export const modifyPost = (postId, updatedData) => async (dispatch) => {
  try {
    const response = await jwtFetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();

    dispatch(updatePost(postId, data.updatedData));
  } catch (error) {
    console.error('Failed to update post:', error);
  }
};

const initialState = {
    posts: [],
  }


const postsReducer = (state = initialState, action) => {
    switch (action.type) {
      case RECEIVE_POSTS:
        debugger 
        return {
          ...state,
          posts: action.payload,
        };
  
      case RECEIVE_POST:
        return {
          ...state,
          posts: [...state.posts, action.payload],
        };
  
        case DELETE_POST:
            return {
              ...state,
              posts: state.posts.filter((post) => post._id !== action.payload),
            };
          
      case UPDATE_POST:
        return {
          ...state,
          posts: state.posts.map((post) => {
            if (post.id === action.payload.postId) {
              return {
                ...post,
                ...action.payload.updatedData,
              };
            }
            return post;
          }),
        };
  
      default:
        return state;
    }
  };
  
  export default postsReducer;