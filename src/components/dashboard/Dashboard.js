import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from "moment"
import { connect } from 'react-redux'
import { getRequests } from "../../actions/requestActions"

import { Paper, Input } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { logoutUser } from '../../actions/authActions'

import AddRequest from "./AddRequest"

import AccessTimeIcon from '@material-ui/icons/AccessTime'
import GetAppIcon from '@material-ui/icons/GetApp'

import { Button } from '@material-ui/core'

import OpenInNewIcon from '@material-ui/icons/OpenInNew'

import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import HttpIcon from '@material-ui/icons/Http'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import DeleteIcon from '@material-ui/icons/Delete'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import EqualizerIcon from '@material-ui/icons/Equalizer'

import {
  Card,
  CardContent,
  CardActions
} from '@material-ui/core'

import { Grid } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 240

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
    },
    topRoot: {
      marginTop: "50px"
    },
    imageContainer: {
      height: 64,
      width: 64,
      margin: '0 auto',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '5px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      width: '100%'
    },
    statsItem: {
      display: 'flex',
      alignItems: 'center'
    },
    statsIcon: {
      color: theme.palette.icon,
      marginRight: theme.spacing(1)
    },
    row: {
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(1)
    },
    spacer: {
      flexGrow: 1
    },
    importButton: {
      marginRight: theme.spacing(1)
    },
    exportButton: {
      marginRight: theme.spacing(1)
    },
    searchInput: {
      marginRight: theme.spacing(1)
    },
    rootSearch: {
      borderRadius: '4px',
      alignItems: 'center',
      padding: theme.spacing(1),
      display: 'flex',
      flexBasis: 420
    },
    icon: {
      marginRight: theme.spacing(1),
      color: theme.palette.text.secondary
    },
    input: {
      flexGrow: 1,
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '-0.05px'
    }
  })
}

class Dashboard extends Component {

  onLogoutClick(e) {
    e.preventDefault()
    this.props.logoutUser()
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
    )

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

          <div className={classes.topRoot}>
            <div className={classes.row}>
              <span className={classes.spacer} />
              <AddRequest />
            </div>
            <div className={classes.row}>
              <Paper
                className={classes.rootSearch}
              >
                <SearchIcon className={classes.icon} />
                <Input
                  className={classes.input}
                  disableUnderline
                />
              </Paper>
            </div>
          </div>

          <div className={classes.toolbar + " " + classes.topRoot}>
            <Grid
              container
              spacing={3}
            >
              {requests.map(request => (
                <Grid
                    item
                    lg={4}
                    md={6}
                    xs={6}
                    key={request.id}
                  >
                  <Card>
                    <CardContent>
                      <div className={classes.imageContainer}>
                        <EqualizerIcon fontSize="large" />
                      </div>
                      <Typography
                        align="center"
                        gutterBottom
                        variant="h4"
                      >
                        { request.method }
                      </Typography>
                      <Typography
                        align="center"
                        variant="body1"
                      >
                        { request.title }
                      </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Grid
                        container
                        justify="space-between"
                      >
                        <Grid
                          className={classes.statsItem}
                          item
                        >
                          <AccessTimeIcon className={classes.statsIcon} />
                          <Typography
                            display="inline"
                            variant="body2"
                          >
                            { moment(request.created_at).fromNow() }
                          </Typography>
                        </Grid>
                        <Grid
                          className={classes.statsItem}
                          item
                        >
                          <DeleteIcon className={classes.statsIcon} />
                          <OpenInNewIcon className={classes.statsIcon} />
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
      </div>
    )

  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getRequests: PropTypes.func.isRequired,
  container: PropTypes.any,
  logoutUser: PropTypes.func.isRequired,
  requests: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  requests: state.requests
})

export default connect(mapStateToProps, { getRequests, logoutUser })(withStyles(styles)(Dashboard))

