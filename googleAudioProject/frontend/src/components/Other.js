import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "./AuthProvider"
import AuthProvider from "./AuthProvider"
import { logInUser } from "../actions/index";

import { connect } from "react-redux";
function mapDispatchToProps(dispatch) {
  return { logInUser: () => dispatch(logInUser()) };
}
// class ConnectedForm extends Component {
//   constructor() {
//     super();
//     this.state = {
//       title: ""
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange(event) {
//     this.setState({ [event.target.id]: event.target.value });
//   }
//   handleSubmit(event) {
//     event.preventDefault();
//     const { title } = this.state;
//     const id = uuidv1();
//     this.props.addArticle({ title, id });
//     this.setState({ title: "" });
//   }
//   render() {
//     const { title } = this.state;
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             className="form-control"
//             id="title"
//             value={title}
//             onChange={this.handleChange}
//           />
//         </div>
//         <button type="submit" className="btn btn-success btn-lg">
//           SAVE
//         </button>
//       </form>
//     );
//   }
// }
// const Form = connect(null, mapDispatchToProps)(ConnectedForm);

// const ConnectedButton = ({isLoggedIn}) => (
  
// );

class ConnectedButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.logInUser);
    return (
    <button onClick={this.props.logInUser} style={{
            position: 'absolute', left: '50%', top: '50%',
            fontSize: '32px',
            transform: 'translate(-50%, -50%)'
        }}>
            press tis
          </button>
        )
  }
}

const Other = connect(null, mapDispatchToProps)(ConnectedButton);

export default Other;


// export default class Other extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div>
//       <AuthContext.Consumer> 
//       { (context) => (
//           <button onClick={() => context.setLogIn(true)} style={{
//             position: 'absolute', left: '50%', top: '50%',
//             fontSize: '32px',
//             transform: 'translate(-50%, -50%)'
//         }}>
//             press tis
//           </button>
//         )
//       }
      
//       </AuthContext.Consumer>
//       </div>
//     )
//   }
// }

// const wrapper = document.getElementById("app");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;
