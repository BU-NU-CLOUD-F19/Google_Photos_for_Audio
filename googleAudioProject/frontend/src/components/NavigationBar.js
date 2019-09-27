import React, { Component } from "react";
import ReactDOM from "react-dom";
// import DataProvider from "./DataProvider";
// import Table from "./Table";
import SignUp from "./SignUp";
import { Navbar, Nav, Styles, NavItem, NavDropdown } from "react-bootstrap";

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="/">Google Photos for Audio</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="userManagement/signIn">Sign In</Nav.Link>
            </Nav>
        </Navbar>
        )
    }
}
