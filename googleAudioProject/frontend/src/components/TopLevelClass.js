import React, { Component } from "react";
import ReactDOM from "react-dom";
import NavigationBar from "./NavigationBar"


export default class TopLevelClass extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
<<<<<<< HEAD
    // console.log(AuthContext);
    return (
      <div
        style={{
            position: 'absolute', left: '50%', top: '50%',
            fontSize: '32px',
            transform: 'translate(-50%, -50%)'
        }}
        >
        {'Welcome to Google Photos for Audios!'}
        </div>
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
=======
    return (
      <div>
      </div>
>>>>>>> parent of 83a97ab... Added some code to share context
    )
  }
}

// const wrapper = document.getElementById("app");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;
