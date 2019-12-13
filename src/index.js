import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Sentry from '@sentry/browser';
import App from './App';


import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import reducer from "./reducers/reducer"

const store = createStore(reducer, applyMiddleware(thunk))

Sentry.init({dsn: "https://26bacf2042764db6a7a1af49e8dde7e1@sentry.io/1855868"});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>

, 
document.getElementById('root'));



