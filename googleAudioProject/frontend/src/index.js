import React from 'react';
import ReactDOM from "react-dom";
import App from "./components/App";
import NavigationBar from "./components/NavigationBar"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
<<<<<<< HEAD
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./components/AuthProvider"
import AuthProvider from "./components/AuthProvider"
import Other from "./components/Other"
import store from "./store/index"
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const authStore = store;
console.log(store.getState());

const routing = (
    <Provider store={authStore}>
    <Router>
        <NavigationBar />
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/other" component={Other} />
            <Route path="/profile" component={Profile} />
        </Switch>
    </Router>
    </Provider>
)

// const routing = (
//     <AuthProvider>
//         <App />
//     </AuthProvider>
// )

=======
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

>>>>>>> parent of 83a97ab... Added some code to share context
ReactDOM.render(routing, document.getElementById('app'));
