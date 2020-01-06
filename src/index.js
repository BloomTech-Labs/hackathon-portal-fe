import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import * as Sentry from '@sentry/browser';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducers/reducer';

import { Auth0Provider } from './auth0-hooks/react-auth0-spa';
import config from './utils/auth_config.json';
import history from './utils/history';

const store = createStore(reducer, applyMiddleware(thunk));

// Sentry.init({dsn: "https://26bacf2042764db6a7a1af49e8dde7e1@sentry.io/1855868"});

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
   history.push(
      appState && appState.targetUrl
         ? appState.targetUrl
         : window.location.pathname
   );
};

ReactDOM.render(
   <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      audience={config.audience}
      onRedirectCallback={onRedirectCallback}
   >
      <Provider store={store}>
         <App />
      </Provider>
   </Auth0Provider>,
   document.getElementById('root')
);
