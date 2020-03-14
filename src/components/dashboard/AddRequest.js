import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => {
  return ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    }
  })
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class AddRequest extends Component {

  constructor() {
    super()
    this.state = {
      open: false
    }

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
  }

  handleClickOpen(e) {
    this.setState({ open: !this.state.open })
  }

  handleClickClose(e) {
    this.setState({ open: false })
  }

  render() {
    const { user } = this.props.auth
    const { classes } = this.props

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
                Sound
              </Typography>
              <Button autoFocus color="inherit" onClick={this.handleClickClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Default notification ringtone" secondary="Tethys" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );

  }
}

AddRequest.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {  })(withStyles(styles)(AddRequest))

