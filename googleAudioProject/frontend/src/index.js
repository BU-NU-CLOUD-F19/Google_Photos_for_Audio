import React from 'react';
import ReactDOM from "react-dom";
import App from "./components/App";
import NavigationBar from "./components/NavigationBar"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

const routing = (
    <Router>
        <NavigationBar />
        <Route exact path="/" component={App} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/profile" component={Profile} />
    </Router>
)

ReactDOM.render(routing, document.getElementById('app'));
