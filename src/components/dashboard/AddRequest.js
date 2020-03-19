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
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Toolbar from '@material-ui/core/Toolbar'
import HttpIcon from '@material-ui/icons/Http'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
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
    },
    marginRight: {
      marginRight: "5px"
    },
    deleteButton: {
      padding: 0,
      marginTop: "34px"
    },
    addRowButton: {
      marginTop: "5px"
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
      auth_type: "basic",
      errors: {},
      addAuthInfo: false,
      addHeaderInfo: false,
      addParams: false,
      headers: [{name: "", value: ""}],
      params: [{name: "", value: ""}]
    }

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.onSubmitSignUp = this.onSubmitSignUp.bind(this)
    this.onChange = this.onChange.bind(this)
    this.showAuthInfo = this.showAuthInfo.bind(this)
    this.showHeaderInfo = this.showHeaderInfo.bind(this)
    this.showAddParams = this.showAddParams.bind(this)
    this.clearStateAndForm = this.clearStateAndForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.removeClick = this.removeClick.bind(this)
    this.addClick = this.addClick.bind(this)
  }

  removeClick(i, entity){
    let stateData = [...this.state[entity]];
    console.log(stateData)
    console.log(i)
    stateData.splice(i, 1);
    if (entity === "headers") {
      this.setState({ headers: stateData });
    } else {
      this.setState({ params: stateData })
    }
    console.log(this.state[entity])
  }

  addClick(e, entity){
    if (entity === "headers") {
      this.setState(prevState => ({
        headers: [...prevState.headers, { name: "", value: "" }]
      }))
    } else {
    this.setState(prevState => ({
      params: [...prevState.params, { name: "", value: "" }]
    }))
    }
  }

  handleChange(e, i, entity) {

    const { name, value } = e.target;
    let stateData = [...this.state[entity]];
    stateData[i] = {...stateData[i], [name]: value};
    if (entity === "headers") {
      this.setState({ headers: stateData });
    } else {
      this.setState({ params: stateData })
    }
  }

  createUI(classes, entity){
    return this.state[entity].map((el, i) => (
     <div key={i} style={{ display: 'inline-flex', width: "100%" }}>
        <TextField
          className={classes.inputMargins + " " + classes.marginTop + " " + classes.marginRight}
          label="Name"
          name="name"
          type="text"
          fullWidth
          value={el.name ||''}
          onChange={(e) => this.handleChange(e, i, entity)}
        />
        <TextField
          className={classes.inputMargins + " " + classes.marginTop + " " + classes.marginRight}
          label="Value"
          name="value"
          type="text"
          fullWidth
          value={el.value ||''}
          onChange={(e) => this.handleChange(e, i, entity)}
        />
        <IconButton className={classes.deleteButton} onClick={(e) => this.removeClick(e, i, entity)}>
          <DeleteIcon />
        </IconButton>
     </div>
    ))
  }

  handleClickOpen(e) {
    this.setState({ open: !this.state.open })
  }

  handleClickClose(e) {
    this.clearStateAndForm(e)
  }

  clearStateAndForm(e) {
    this.setState({
      open: false,
      method: "",
      url: "",
      username: "",
      password: "",
      auth_type: "basic",
      params: {},
      errors: {},
      addAuthInfo: false,
      addHeaderInfo: false,
      addParams: false,
      headers: [{name: "", value: ""}],
      params: [{name: "", value: ""}]
    })
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

  showAddParams(e) {
    this.setState({ addParams: !this.state.addParams })
  }

  onSubmitSignUp(e) {
    e.preventDefault()

    const newRequest = {
      request: {
        url: this.state.url,
        method: this.state.method,
        auth: this.state.addAuthInfo ? {username: this.state.username, password: this.state.password, auth_type: this.state.auth_type} : {},
        headers: this.state.addHeaderInfo ? this.state.headers : {},
        params: this.state.addParams ? this.state.params : {}
      }
    }
    this.props.addRequest(newRequest)
  }

  showHeaderInfo(e) {
    this.setState({ addHeaderInfo: !this.state.addHeaderInfo })
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
                <RadioGroup name="auth_type" value={this.state.auth_type} onChange={this.onChange} row>
                  <FormControlLabel
                    className={classes.radioMargin}
                    value="basic"
                    control={<Radio color="primary" />}
                    labelPlacement="end"
                    label="Basic"
                  />
                  <FormControlLabel
                    className={classes.radioMargin}
                    value="digest"
                    control={<Radio color="primary" />}
                    labelPlacement="end"
                    label="Digest"
                  />
                </RadioGroup>
              </React.Fragment>
            }
            <InputLabel id="method" className={classes.inputMargins}>Header</InputLabel>
            <RadioGroup name="addHeaderInfo" value={this.state.addHeaderInfo} onChange={this.showHeaderInfo} row>
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
              this.state.addHeaderInfo &&
              <React.Fragment>
                <Box component="span" display="block">
                  {this.createUI(classes, "headers")}
                </Box>
                <div style={{ width: '100%' }}>
                  <Box component="span" display="block">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => this.addClick(e, "headers")}
                      className={classes.addRowButton}
                      startIcon={<AddBoxIcon />}
                    >
                      Add
                    </Button>
                  </Box>
                </div>
              </React.Fragment>
            }

            <InputLabel id="method" className={classes.inputMargins}>Params</InputLabel>
            <RadioGroup name="addParams" value={this.state.addParams} onChange={this.showAddParams} row>
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
              this.state.addParams &&
              <React.Fragment>
                <Box component="span" display="block">
                  {this.createUI(classes, "params")}
                </Box>
                <div style={{ width: '100%' }}>
                  <Box component="span" display="block">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => this.addClick(e, "params")}
                      className={classes.addRowButton}
                      startIcon={<AddBoxIcon />}
                    >
                      Add
                    </Button>
                  </Box>
                </div>
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
