import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "react-redux";


export const UserContext = React.createContext();

export default class UserProvider extends Component {
  static didUpdate = false;

  constructor(props) {
    super(props);
    this.state = {userEmail: "email"};
    console.log(this.state.userEmail);
  }

  componentDidUpdate = () => {
      console.log(this.state);
  }

  render() {
    return (
        <UserContext.Provider value={
          {state: this.state,
          setEmail: (value) => this.setState({userEmail: value})}}>
            {this.props.children}
        </UserContext.Provider>
    )
  }
}
