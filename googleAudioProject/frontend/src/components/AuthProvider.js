import React, { Component } from "react";
import ReactDOM from "react-dom";

export const AuthContext = React.createContext();

export default class AuthProvider extends Component {
    static didUpdate = false;

  constructor(props) {
    super(props);
    if (AuthProvider.didUpdate == false) {
        this.state = {isLoggedIn : false};
        AuthProvider.didUpdate = true;
    } else {
        this.state = {isLoggedIn: true};
    }
    
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

