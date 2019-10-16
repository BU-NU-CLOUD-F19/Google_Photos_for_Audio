import React, { Component } from "react";
import ReactDOM from "react-dom";
import TopLevelClass from "./TopLevelClass"
import AuthProvider from "./AuthProvider"
import NavigationBar from "./NavigationBar"
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Other from "./Other"
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";


// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {isLoggedIn : false};
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <TopLevelClass ></TopLevelClass>
//       </React.Fragment>
//     )
//   }
// }

// const wrapper = document.getElementById("app");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;

const App = (
  <AuthProvider>
  <Router>
      <NavigationBar />
      <Switch>
          <Route exact path="/" component={TopLevelClass} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/other" component={Other} />
          <Route path="/profile" component={Profile} />
      </Switch>
  </Router>
  </AuthProvider>
)

ReactDOM.render(App, document.getElementById('app'));
