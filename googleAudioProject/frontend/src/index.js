import React from 'react';
import ReactDOM from "react-dom";
import App from "./components/App";
import NavigationBar from "./components/NavigationBar"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

const routing = (
    <Router>
        <NavigationBar />
        <Route exact path="/" component={App} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
    </Router>
)

ReactDOM.render(routing, document.getElementById('app'));
