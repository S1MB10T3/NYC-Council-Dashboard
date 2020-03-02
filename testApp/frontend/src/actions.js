import axios from 'axios';

// Authentication Actions
export const AUTH_INIT = 'AUTH_INIT';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authInit = () => {
  return {
    type: AUTH_INIT
  }
}

export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    token: token
   }
}


export const authFailed = (error) => {
  return {
    type: AUTH_FAILED,
    token: error
   }
}

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT
  }
}

// Function to logout the user after a set time. [1 Hour]
export const authTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }
}

export const login = (username, password) => {
  return dispatch => {
    dispatch(authInit());
    axios.post('http://127.0.0.1:8000/login/',{
      username: username,
      password: password
    })
    .then(res => {
      const token = res.data.token;
      // Adding an expiration date for storing keys on the browser. [1 Hour]
      const expirationDate = new Date(new Date().getTime() * 3600 + 1000)
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(authSuccess(token))
      dispatch(authTimeout(expirationDate))
    })
    .catch(err =>{
      dispatch(authFailed(err))
    })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if ( expirationDate <= new Date()){
        dispatch(logout());
      } else {
        dispatch(authSuccess(token))
        dispatch(authTimeout( (expirationDate.getTime() - new Date().getTime()) /1000));
      }
    }
  }
}
// Complaints/Dashboard Actions
