import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { applyMiddleware, createStore} from 'redux';
import thunk from "redux-thunk";
import logger from 'redux-logger';
import App from './App';
import * as actionTypes from './actions';


// Utilities
const updateObject = (oldObject, updatedProps) => {
  return {
    ...oldObject,
    ...updatedProps
  }
}

// Reducers
const initialState = {
  token: null,
  complaints: [],
  fetching: false,
  fetched: false,
  error: null,
  loading: false
}


//Note: Adding this to the Switch case in reducers might be cleaner -Rokney
const authInit = (state, action) => {
  return updateObject(state,{
    error: null,
    loading: true
  });
}

const authSuccess = (state, action) => {
  return updateObject(state,{
    token: action.token,
    error: null,
    loading: false
  });
}

const authFailed = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT: return authInit(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAILED: return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
}

const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducer, middleware);


ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
