import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store';
import 'normalize.css';
import './reset.css';
import uploadTrack from './store/tracks'
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';

let store = configureStore({});
window.store = store;
window.uploadTrack = uploadTrack;

function Root() {
  return (
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);