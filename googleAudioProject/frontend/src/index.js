import React from 'react';
import ReactDOM from "react-dom";
import App from "./components/App";
import NavigationBar from "./components/NavigationBar"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./components/AuthProvider"
import AuthProvider from "./components/AuthProvider"
import UserProvider from "./components/UserProvider"
import Other from "./components/Other"
import HomePage from "./components/UserPage"

const NotFound = () => {
    return (
        <div style={{
            position: 'absolute', left: '50%', top: '50%',
            fontSize: '32px',
            transform: 'translate(-50%, -50%)'
        }}>
            <h3>404 - Not Found</h3>
        </div>
    );
};

const routing = (
    <AuthProvider>
    <UserProvider>
    <Router>
        <NavigationBar />
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/profile" component={Profile} />
            <Route path="/other" component={Other} />
            <Route exact path="/homepage" component={HomePage} />
            <Route component={NotFound} />
        </Switch>
    </Router>
    </UserProvider>
    </AuthProvider>
)

ReactDOM.render(routing, document.getElementById('app'));
