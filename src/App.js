import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
// import { clearCurrentProfile } from "./actions/profileActions";

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import Register from "./components/auth/Register"
import Login from "./components/auth/Login"

import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Container>
          </React.Fragment>
        </Router>
      </Provider>
    )
  }
}

export default App
