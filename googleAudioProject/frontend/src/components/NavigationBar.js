// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { Navbar, Nav, Styles, NavItem, NavDropdown } from "react-bootstrap";

// export default class NavigationBar extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//         <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
//             <Navbar.Brand href="/">Google Photos for Audio</Navbar.Brand>
//             <Nav className="ml-auto">
//                 <Nav.Link href="/">Home</Nav.Link>
//                 <Nav.Link href="/signIn">Sign In</Nav.Link>
//             </Nav>
//         </Navbar>
//         )
//     }
// }

import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
const NavigationBar = () => {
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                React & Material-UI Sample Application
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavigationBar;

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