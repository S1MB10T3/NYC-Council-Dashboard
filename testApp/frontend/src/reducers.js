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
  topComplaint: '',
  closedCases: '',
  openCases: '',
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

const conplaintsFetching = (state, action) => {
  return updateObject(state, {
    fetching: true,
    fetched: false,
    error: null
  });
}

const conplaintsFetched = (state, action) => {
  return updateObject(state, {
    complaints: action.complaints,
    fetching: false,
    fetched: true,
    error: null
  });
}

const conplaintsFailed = (state, action) => {
  return updateObject(state, {
    fetching: false,
    fetched: false,
    error: true
  });
}

const topConplaintFetched = (state, action) => {
  return updateObject(state, {
    topComplaint: action.topComplaint,
    fetching: false,
    fetched: true,
    error: null
  });
}

const openConplaintsFetched = (state, action) => {
  return updateObject(state, {
    openCases: action.openCases,
    fetching: false,
    fetched: true,
    error: null
  });
}

const closedConplaintsFetched = (state, action) => {
  return updateObject(state, {
    closedCases: action.closedCases,
    fetching: false,
    fetched: true,
    error: null
  });
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT: return authInit(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAILED: return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.FETCHING_COMPLAINTS: return conplaintsFetching(state, action);
    case actionTypes.FETCHED_COMPLAINTS: return conplaintsFetched(state, action);
    case actionTypes.FETCHED_COMPLAINTS_FAILED: return conplaintsFailed(state, action);
    case actionTypes.FETCHED_TOP_COMPLAINTS: return topConplaintFetched(state, action);
    case actionTypes.FETCHED_CLOSE_COMPLAINTS: return closedConplaintsFetched(state, action);
    case actionTypes.FETCHED_OPEN_COMPLAINTS: return openConplaintsFetched(state, action);
    default:
      return state;
  }
}
