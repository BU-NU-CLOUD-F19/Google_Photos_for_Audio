import React, { useContext, Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import axios from "axios";
import { UserContext } from "./UserProvider";
import { AuthContext } from "./AuthProvider";
// import { Table } from "react-bootstrap";
import { AWS } from '../../AWS_keys';
import ReactS3 from 'react-s3';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Google Audio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// function PullFiles(){
//     const user = useContext(UserContext);
//     return (
//     axios.post("http://127.0.0.1:8000/home/", {user_email:user.state.userEmail})
//           .then(function (response) {
//             console.log(response);
//           })
//           .catch(function (error) {
//             console.log(error);
//           })
//           );
// }

// function DisplayFiles(files) {
//   return (<li></li>files.map
// }

// const handleLogout = function(){
//   delete localStorage.accessToken;
//   auth.setAuth(false);
//   props.history.push('/');
// }


const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  footer:{
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false,
                  files : [],
                  expandedRow : null};
  }

  handleRowExpansion = (id) => {
    let currentLogIn = this.state.isLoggedIn;
    let currentFiles = this.state.files;

    console.log(id);

  }

  handleLogout = () => {
    let user = this.context;
    delete localStorage.accessToken;
    user.setAuth(false);
    // props.history.push('/');
  }

  PullFiles = async () => {
    let user = this.context;
    let currentComponent = this;

    return (
    axios.post("http://127.0.0.1:8000/home/", {user_email: 'user2@gmail.com'})//user.state.userEmail})//user.state.userEmail})
          .then(function (response) {
            if (Array.isArray(response['data'])) {
              currentComponent.setState({isLoggedIn: user.state.isAuthenticated, 
                                         files: response['data']});
            }
          })
          .catch(function (error) {
            console.log(error);
          })
    );
  }
  
  Upload_S3 = (e) => {
    let user = this.context;
    let user_email = user.state.userEmail;
    let new_email = user_email.replace('@', '__');
    const config = {
      bucketName: 'googleaudio',
      dirName: new_email, /* optional */
      region: 'us-east-2',
      accessKeyId: AWS.accessKeyId,
      secretAccessKey: AWS.secretAccessKey,
    }
    return(
      console.log(e),
      console.log(e.target.files[0]),

      ReactS3.uploadFile(e.target.files[0], config)
      .then((data)=>{
        console.log(data);
      })
      .catch((err)=>{
        alert(err);
      })
    )
  }

  async componentDidMount() {
    let user = this.context;
    this.setState({isLoggedIn: user.state.isAuthenticated, files: []});
    await this.PullFiles();
  }

  render() {
    let user = this.context;
    const { classes } = this.props;
    console.log(this.state.files);

    let content;
    if (this.state.isLoggedIn) {
      content = <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <AccountCircleOutlinedIcon />
                  </Avatar>
                  <Typography component="h5">
                    {user.state.userEmail}
                  </Typography>

                  <Button
                    // onClick={console.log(response)}
                    // fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Upload Audio
                  </Button>
                  <input
                  type = "file"
                   onChange = {this.Upload_S3}
                  accept="video/*,audio/*"
                  />

                  <Link
                    to="/"
                    onClick={this.handleLogout}
                    variant="body2">
                    {"Logout"}
                  </Link>
                  <br />
                  <div>Files</div>
                  {/* <Table striped bordered hover size="sm"> */}
                  <div>
                  {this.state.files.map((file, index) => {
                        return (
                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>{file['file_name']}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <div>
                                <div>
                                  <Typography>
                                    Key Words
                                  </Typography>
                                </div>
                                <div>
                                  <Typography>
                                    {file['key_words'].join(', ')}
                                  </Typography>
                                </div>
                              </div>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>)
                      })}
                  
                  </div>
                </div>;
    } else {
      content = <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <WarningTwoToneIcon />
                  </Avatar>

                  <Typography variant="h4">
                    Not logged in.
                  </Typography>

                  <Typography variant="body1">
                    {"Please "}
                    <Link
                      to="/signIn"
                      variant="body2">
                      {"log in"}
                    </Link>
                    {" to access your profile."}
                  </Typography>
                </div>;
    }

    return (
      <Container component="main" maxWidth="xl">
        {/* <CssBaseline /> */}
        {content}
      </Container>
    )
  }
}

Profile.contextType = UserContext;
export default withStyles(useStyles)(Profile);
