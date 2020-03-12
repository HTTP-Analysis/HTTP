import API from "../utils/API"

import {
  ADD_REQUEST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_REQUESTS,
  GET_REQUEST,
  REQUEST_LOADING,
  DELETE_REQUEST
} from './types';

export const getRequests = () => dispatch => {
  dispatch(setRequestLoading());
  axios
    .get('/api/requests')
    .then(res =>
      dispatch({
        type: GET_REQUESTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REQUESTS,
        payload: null
      })
    );
};

// Set loading state
export const setRequestLoading = () => {
  return {
    type: REQUEST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};