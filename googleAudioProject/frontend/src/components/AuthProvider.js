import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "react-redux";


export const AuthContext = React.createContext();

export default class AuthProvider extends Component {
  static didUpdate = false;

  constructor(props) {
    super(props);
    this.state = {isAuthenticated: false};
    console.log(this.state.isAuthenticated);
  }

  componentDidUpdate = () => {
      console.log(this.state);
  }

  render() {
    return (
        <AuthContext.Provider value={
          {state: this.state,
          setAuth: (value) => this.setState({isAuthenticated: value})}}>
            {this.props.children}
        </AuthContext.Provider>
    )
  }
}
