import React, { Component } from "react";
import ReactDOM from "react-dom";
// import DataProvider from "./DataProvider";
// import Table from "./Table";
import SignUp from "./SignUp"


class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // <DataProvider endpoint="api/userManagement/"
    //             render={data => <Table data={data} />} />

    return (
      <SignUp></SignUp>
    )
  }
}



// const App = () => (
  
// );

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
