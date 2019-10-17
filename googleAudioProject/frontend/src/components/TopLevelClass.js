import React, { Component } from "react";
import ReactDOM from "react-dom";
import NavigationBar from "./NavigationBar"
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
        {context.state.isLoggedIn? 'Logged in!': 'Welcome to Google Photos for Audios!'}
        </div>
        )
      }
      
      </AuthContext.Consumer>
    );
  }
}
      // <div>

      // {/* <AuthContext.Consumer> 
      // { (context) => (
      //   <div
      //   style={{
      //       position: 'absolute', left: '50%', top: '50%',
      //       fontSize: '32px',
      //       transform: 'translate(-50%, -50%)'
      //   }}
      //   >
      //   {context.state.isLoggedIn? 'Logged in!': 'Welcome to Google Photos for Audios!'}
      //   </div>
      //   )
      // }
      
      // </AuthContext.Consumer> */}
      // </div>

// const wrapper = document.getElementById("app");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;
