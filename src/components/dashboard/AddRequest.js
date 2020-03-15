import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addRequest } from "../../actions/requestActions"

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DialogContent from '@material-ui/core/DialogContent'
import Radio from '@material-ui/core/Radio'
import Divider from '@material-ui/core/Divider'
import RadioGroup from '@material-ui/core/RadioGroup'
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Toolbar from '@material-ui/core/Toolbar'
import HttpIcon from '@material-ui/icons/Http'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => {
  return ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    inputMargins: {
      marginTop: theme.spacing(2),
    },
    radioMargin: {
      marginLeft: "-5px"
    },
    marginTop: {
      marginTop: "10px"
    }
  })
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

class AddRequest extends Component {

  constructor() {
    super()
    this.state = {
      open: false,
      method: "",
      url: "",
      username: "",
      password: "",
      auth_type: "",
      params: {},
      errors: {},
      addAuthInfo: false
    }

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.onSubmitSignUp = this.onSubmitSignUp.bind(this)
    this.onChange = this.onChange.bind(this)
    this.showAuthInfo = this.showAuthInfo.bind(this)
  }

  handleClickOpen(e) {
    this.setState({ open: !this.state.open })
  }

  handleClickClose(e) {
    this.setState({ open: false })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  showAuthInfo(e) {
    this.setState({ addAuthInfo: !this.state.addAuthInfo })
  }

  onSubmitSignUp(e) {
    e.preventDefault()

    const newRequest = {
      request: {
        url: ""
      }
    }
    this.props.addRequest(newRequest)
  }

  render() {
    const { user } = this.props.auth
    const { classes } = this.props
    const { errors } = this.state

    return (
      <div>
        <Typography onClick={this.handleClickOpen}>
          Add
        </Typography>
        <Dialog fullScreen open={this.state.open} onClose={this.handleClickClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleClickClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Request
              </Typography>
              <Button autoFocus color="inherit" onClick={this.onSubmitSignUp}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <TextField
              className={classes.inputMargins + " " + classes.marginTop}
              error={errors.url ? true : false}
              label="URL"
              name="url"
              type="text"
              fullWidth
              helperText={errors.url}
              value={this.state.url}
              onChange={this.onChange}
            />
            <FormControl fullWidth error={errors.method ? true : false} className={classes.marginTop}>
              <InputLabel id="method">Method</InputLabel>
              <Select
                name="method"
                value={this.state.method}
                onChange={this.onChange}
              >
                <MenuItem value="GET">GET</MenuItem>
                <MenuItem value="POST">POST</MenuItem>
                <MenuItem value="PATCH">PATCH</MenuItem>
                <MenuItem value="DELETE">DELETE</MenuItem>
              </Select>
              <FormHelperText>{errors.method}</FormHelperText>
            </FormControl>
            <InputLabel id="method" className={classes.inputMargins}>Auth</InputLabel>
            <RadioGroup name="addAuthInfo" value={this.state.addAuthInfo} onChange={this.showAuthInfo} row>
              <FormControlLabel
                className={classes.radioMargin}
                value={true}
                control={<Radio color="primary" />}
                labelPlacement="end"
                label="Yes"
              />
              <FormControlLabel
                className={classes.radioMargin}
                value={false}
                control={<Radio color="primary" />}
                labelPlacement="end"
                label="No"
              />
            </RadioGroup>
            {
              this.state.addAuthInfo &&
              <React.Fragment>
                <TextField
                  className={classes.inputMargins + " " + classes.marginTop}
                  label="Username"
                  name="username"
                  type="text"
                  fullWidth
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <TextField
                  className={classes.inputMargins + " " + classes.marginTop}
                  label="Password"
                  name="password"
                  type="text"
                  fullWidth
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <RadioGroup value={this.state.auth} onChange={this.onChange} row>
                  <FormControlLabel
                    className={classes.radioMargin}
                    value="Basic"
                    control={<Radio color="primary" />}
                    labelPlacement="end"
                    label="Basic"
                  />
                  <FormControlLabel
                    className={classes.radioMargin}
                    value="Digest"
                    control={<Radio color="primary" />}
                    labelPlacement="end"
                    label="Digest"
                  />
                </RadioGroup>
              </React.Fragment>
            }
          </DialogContent>
        </Dialog>
      </div>
    )

  }
}

AddRequest.propTypes = {
  auth: PropTypes.object.isRequired,
  addRequest: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { addRequest })(withStyles(styles)(AddRequest))
