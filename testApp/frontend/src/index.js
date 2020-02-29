import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { applyMiddleware, createStore} from 'redux';
import thunk from "redux-thunk";
import axios from 'axios';
import logger from 'redux-logger';

// Reducers
const initialState = {
  complaints: [],
  fetching: false,
  fetched: false,
  error: null
}

const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducer, middleware);

ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
