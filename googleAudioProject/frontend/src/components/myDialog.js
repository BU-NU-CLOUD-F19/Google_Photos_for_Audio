import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class myDialog extends Component {
  state = {
    /* 0:succeed in registration
       1:existed user
       2:use not existed
       3:incorrect password
    */
    responseType: null,
    visible: false
  };

  setResponse = response => {
    if (response === 400) {
      Dialog.setState({responseType:0})
    };
  };

  alertType = ()  => {
    var alertDescription;
    const { responseType } = this.state;
    if (responseType !== null) this.handleOpen;
    if (responseType === 0) alertDescription = "Registration succeeded!";
    else if (responseType === 1) alertDescription = "Email already existed!";
    else if (responseType === 2)
      alertDescription = "User doesn't exist! Please register first!";
    else if (responseType === 3) alertDescription = "Incorrect password!";
    return alertDescription;
  };

  handleClose = () => {
    this.setState({visible:false});
  };

  handleOpen = () => {
    this.setState({visible:true});
  };

  render() {
    this.alertType();
    return (
      <div>
        <Dialog
          visible={true}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.alertType.alertDescription}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Dialog;
