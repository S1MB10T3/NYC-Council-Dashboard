import axios from 'axios';

// Config for axios to send token for certian get request
const config = {
  headers: {
    Authorization: `Token ${localStorage.getItem('token')}`
  }
};


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

export const IsAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token !== null) {
    return true;
  }
  return false;

}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT
  }
}

// Function to logout the user after a set time. [1 Hour]
export const authTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      // dispatch(logout());
    }, expirationTime * 1000)
  }
}

export const login = (username, password) => {
  return dispatch => {
    dispatch(authInit());
    axios.post('http://127.0.0.1:8000/login/', {
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
      .catch(err => {
        dispatch(authFailed(err))
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!IsAuthenticated()) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token))
        dispatch(authTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}

// Complaints/Dashboard Actions
export const FETCHING_COMPLAINTS = 'FETCHING_COMPLAINTS';
export const FETCHED_COMPLAINTS = 'FETCHED_COMPLAINTS';
export const FETCHED_COMPLAINTS_FAILED = 'FETCHED_COMPLAINTS_FAILED';
export const FETCHED_TOP_COMPLAINTS = 'FETCHED_TOP_COMPLAINTS';
export const FETCHED_OPEN_COMPLAINTS = 'FETCHED_OPEN_COMPLAINTS';
export const FETCHED_CLOSE_COMPLAINTS = 'FETCHED_CLOSE_COMPLAINTS';

export const gotComplaints = (data) => {
  return {
    type: FETCHED_COMPLAINTS,
    complaints: data
  }
}

export const gotOpenComplaints = (data) => {
  return {
    type: FETCHED_OPEN_COMPLAINTS,
    openCases: data
  }
}
export const gotCloseComplaints = (data) => {
  return {
    type: FETCHED_CLOSE_COMPLAINTS,
    closedCases: data
  }
}
export const gotTopComplaints = (string) => {
  return {
    type: FETCHED_TOP_COMPLAINTS,
    topComplaint: string
  }
}

export const getComplaints = () => {
  return dispatch => {
    //dispatch fetch
    axios.get('http://127.0.0.1:8000/api/complaints/', config)
      .then(res => {
        dispatch(gotComplaints(res.data))
      })
      .catch(err => {
        return err;
      })
  }
}

export const getOpenComplaints = () => {
  return dispatch => {
    //dispatch fetch
    axios.get('http://127.0.0.1:8000/api/complaints/openCases/', config)
      .then(res => {
        dispatch(gotOpenComplaints(Object.keys(res.data).length.toString()))
      })
      .catch(err => {
        return err;
      })
  }
}

export const getCloseComplaints = () => {
  return dispatch => {
    //dispatch fetch
    axios.get('http://127.0.0.1:8000/api/complaints/closedCases/', config)
      .then(res => {
        dispatch(gotCloseComplaints(Object.keys(res.data).length.toString()))
      })
      .catch(err => {
        return err;
      })
  }
}

export const getTopComplaint = () => {
  return dispatch => {
    //dispatch fetch
    axios.get('http://127.0.0.1:8000/api/complaints/topComplaints', config)
      .then(res => {
        const type = res.data[0][0];
        dispatch(gotTopComplaints(type))
      })
      .catch(err => {
        return err;
      })
  }
}

export const getConstituentsComplaints = () => {
  return dispatch => {
    //dispatch fetch
    axios.get('http://127.0.0.1:8000/api/complaints/constituents/', config)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      })
  }
}
