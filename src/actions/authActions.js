import { GET_ERRORS, SET_CURRENT_USER } from "./types"
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from "jwt-decode"
import API from "../utils/API"

// Register User
export const registerUser = (userData, history) => dispatch => {
  API
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      })
    )
}

export const loginUser = userData => dispatch => {
  API
    .post("/api/users/login", userData)
    .then(res => {
      console.log(res)
      // save to localStorage
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      })
    )
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
