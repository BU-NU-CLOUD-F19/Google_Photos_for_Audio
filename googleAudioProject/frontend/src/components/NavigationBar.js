import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Navbar, Nav, Styles, NavItem, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { makeStyles, withStyles } from '@material-ui/core/styles';


const useStyles = theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Navbar style={useStyles.paper} bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand as={Link} to="/">Google Photos for Audio</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav className="ml-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/signIn">Sign In</Nav.Link>
                <Nav.Link as={Link} to="/other">Other</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}


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