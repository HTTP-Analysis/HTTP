import { combineReducers } from "redux"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"
import requestReducer from "./requestReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  requests: requestReducer
})
