import {
  ADD_REQUEST,
  GET_REQUESTS,
  GET_REQUEST,
  DELETE_REQUEST,
  REQUEST_LOADING
} from '../actions/types';

const initialState = {
  requests: [],
  request: {},
  loading: false,
  modalClose: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload,
        loading: false
      };
    case GET_REQUEST:
      return {
        ...state,
        request: action.payload,
        loading: false
      };
    case ADD_REQUEST:
      return {
        ...state,
        requests: [action.payload, ...state.requests],
        modalClose: true,
        loading: false
      };
    case DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(request => request._id !== action.payload)
      };
    default:
      return state;
  }
}
