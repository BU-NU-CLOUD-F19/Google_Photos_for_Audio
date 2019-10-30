import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "./AuthProvider"


export default class TopLevelClass extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <AuthContext.Consumer>
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

      </AuthContext.Consumer>
    );
  }
}
