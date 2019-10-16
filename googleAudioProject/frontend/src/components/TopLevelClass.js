import React, { Component } from "react";
import ReactDOM from "react-dom";
import NavigationBar from "./NavigationBar"
import { AuthContext } from "./AuthProvider"
import AuthProvider from "./AuthProvider"


export default class TopLevelClass extends Component {
  constructor(props) {
    super(props);
  }

  // handleLogInChange = (newState) => {
  //   this.setState(
  //       {isLoggedIn: newState}
  //   )
  // }

  render() {
    console.log(AuthContext);
    return (
      <div>
      <AuthContext.Consumer> 
      { (context) => (
        <div
        style={{
            position: 'absolute', left: '50%', top: '50%',
            fontSize: '32px',
            transform: 'translate(-50%, -50%)'
        }}
        >
        {context.state.isLoggedIn? 'Logged in!': 'Welcome to Google Photos for Audios!'}
        </div>
        )
      }
      
      </AuthContext.Consumer>
      </div>
    )
  }
}

// const wrapper = document.getElementById("app");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;
