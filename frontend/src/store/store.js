import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import follow from './follow';
import errors from './errors';
import tracks, { trackErrorsReducer } from './tracks';
import audioReducer from './audio';
import postsReducer from './posts';

const rootReducer = combineReducers({
  session,
  errors, 
  tracks, 
  trackErrors: trackErrorsReducer, 
  audio: audioReducer, 
  follow, 
  posts: postsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;