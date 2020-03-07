import React, { Component } from 'react'


import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { registerUser } from "../../actions/authActions"

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import AccountCircle from '@material-ui/icons/AccountCircle'

const styles = theme => {
  return ({
    root: {
      width: 500,
      margin: "0 auto",
      marginTop: 10
    },
    margin: {
      margin: 5,
    },
    widthInput: {
      width: 400
    },
    button: {
      textTransform: "capitalize"
    },
    actions: {
      width: 400,
      margin: "0 auto",
      marginBottom: 20
    }
  })
}

class Register extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard")
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { classes } = this.props
    const { errors } = this.state

    return (
      <Card className={classes.root}>
        <CardContent align="center">
          <TextField
            className={classes.margin + " " + classes.widthInput}
            error={errors.email}
            label="Email"
            name="email"
            type="email"
            helperText={errors.email}
            value={this.state.email}
            onChange={this.onChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className={classes.margin + " " + classes.widthInput}
            error={errors.password}
            label="Password"
            name="password"
            type="password"
            helperText={errors.password}
            value={this.state.password}
            onChange={this.onChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
        <CardActions
          align="center"
          className={classes.actions}
        >
          <Button
            variant="contained"
            color="primary"
            align="left"
            fullWidth
            className={classes.button}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            align="right"
            onClick={this.onSubmit}
            className={classes.button}
            variant="contained"
          >
            Sign up
          </Button>
        </CardActions>
      </Card>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(withStyles(styles)(Register)))
