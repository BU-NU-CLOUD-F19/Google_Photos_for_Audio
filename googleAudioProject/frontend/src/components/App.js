import React, { Component } from "react";
import ReactDOM from "react-dom";
import NavigationBar from "./NavigationBar"


export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavigationBar></NavigationBar>
      </div>
    )
  }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
