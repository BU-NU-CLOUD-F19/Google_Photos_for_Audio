import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "./AuthProvider"
import { UserContext } from "./UserProvider"


export default class TopLevelClass extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <UserContext.Consumer>
      { (context) => (
        <div
        style={{
            position: 'absolute', left: '50%', top: '50%',
            fontSize: '32px',
            transform: 'translate(-50%, -50%)'
        }}
        >
        {context.state.isAuthenticated? 'User authenticated!': 'Welcome to Google Photos for Audio!'}
        </div>
        )
      }

      </UserContext.Consumer>
    );
  }
}
