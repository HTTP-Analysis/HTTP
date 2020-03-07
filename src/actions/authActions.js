import { GET_ERRORS, SET_CURRENT_USER } from "./types"
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
