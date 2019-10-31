import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "./AuthProvider"
import AuthProvider from "./AuthProvider"

export default class Other extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <AuthContext.Consumer>
      { (context) => (
          <button onClick={() => context.setAuth(true)} style={{
            position: 'absolute', left: '50%', top: '50%',
            fontSize: '32px',
            transform: 'translate(-50%, -50%)'
        }}>
            press this
          </button>
        )
      }

      </AuthContext.Consumer>
      </div>
    )
  }
}

// const wrapper = document.getElementById("app");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;
