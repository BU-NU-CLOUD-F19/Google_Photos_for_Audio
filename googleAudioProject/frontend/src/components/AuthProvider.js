import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "react-redux";

// export function AuthProvider




// var persistentState = {isLoggedIn: false};
export const AuthContext = React.createContext();

export default class AuthProvider extends Component {
    static didUpdate = false;

  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
    
    console.log(this.state.isLoggedIn);
  }

  componentDidUpdate = () => {
      console.log(this.state);
  }

//   componentDidMount = () => {
//       console.log("uh oh");
//   }

  render() {
    return (
        <AuthContext.Provider value={
            {state: this.state,
             setLogIn: (value) => this.setState({isLoggedIn: value})}}>
        {this.props.children}
        </AuthContext.Provider>
    )
  }
}

