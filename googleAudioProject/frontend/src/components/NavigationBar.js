import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Navbar, Nav, Styles, NavItem, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "./UserProvider";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import Menu from '@material-ui/core/Menu';

const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
});

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    handleLogout = () => {
        let user = this.context;
        delete localStorage.accessToken;
        user.setAuth(false);
    }

    render() {
        let user = this.context;
        const { classes } = this.props;

        return (
        <div>
        {/* <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand as={Link} to="/">Google Photos for Audio</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav className="ml-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                {user.state.isAuthenticated? <Nav.Link as={Link} onClick={this.handleLogout} to="/">Sign Out</Nav.Link> : 
                                             <Nav.Link as={Link} to="/signIn">Sign In</Nav.Link>}
            </Nav>
            </Navbar.Collapse>
        </Navbar> */}
        <AppBar>
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" component={Link} to="/">
                <HomeIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                Google Photos for Audio
            </Typography>
            {user.state.isAuthenticated? (
                <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    component={Link}
                    to="/profile"
                    // onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Button component={Link} to="/" onClick={this.handleLogout} color="inherit">Logout</Button>
                </div>
            ):
            <Button component={Link} to="/signIn" color="inherit">Login</Button>}
            </Toolbar>
        </AppBar>
        </div>
        )
    }
}

NavigationBar.contextType = UserContext;
export default withStyles(useStyles)(NavigationBar);
{/* <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Photos
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar> */}
// import React from 'react'
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// const NavigationBar = () => {
//     return(
//         <div>
//         <AppBar position="static">
//             <Toolbar>
//                 <Typography variant="title" color="inherit">
//                 React & Material-UI Sample Application
//                 </Typography>
//             </Toolbar>
//         </AppBar>
//         </div>
//     )
// }
// export default NavigationBar;

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function NavigationBar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             News
//           </Typography>
//           <Button color="inherit" href="/signIn">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
