import React, { Component } from "react";
import ReactDOM from "react-dom";
import NavigationBar from "./NavigationBar"


export default class TopLevelClass extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

// const wrapper = document.getElementById("app");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;
