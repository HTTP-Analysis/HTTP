import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRequests } from "../../actions/requestActions"

import { logoutUser } from '../../actions/authActions';

import AddRequest from "./AddRequest"

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import HttpIcon from '@material-ui/icons/Http';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => {
  return ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    }
  })
}

class Dashboard extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  componentDidMount() {
    this.props.getRequests()
  }

  constructor() {
    super()
    this.state = {
      mobileOpen: false
    }

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }

  handleDrawerToggle(e) {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  render() {
    const { user } = this.props.auth
    const { requests, loading } = this.props.requests
    const { classes } = this.props
    const { container } = this.props

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><AddBoxIcon /></ListItemIcon>
            <ListItemText>
              <AddRequest />
            </ListItemText>
          </ListItem>
          <ListItem button selected>
            <ListItemIcon><HttpIcon /></ListItemIcon>
            <ListItemText primary="Requests" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText onClick={this.onLogoutClick.bind(this)}>
              Logout
            </ListItemText>
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              HTTP Analysis
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor="left"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
    );

  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getRequests: PropTypes.func.isRequired,
  container: PropTypes.any,
  logoutUser: PropTypes.func.isRequired,
  requests: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  requests: state.requests
});

export default connect(mapStateToProps, { getRequests, logoutUser })(withStyles(styles)(Dashboard))

