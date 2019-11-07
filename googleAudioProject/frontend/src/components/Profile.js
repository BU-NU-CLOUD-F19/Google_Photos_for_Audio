import React, { useContext, Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import axios from "axios";
import { UserContext } from "./UserProvider"
import { AuthContext } from "./AuthProvider"
import ReactS3 from 'react-s3';
import reactDom from 'react-dom';
import { AWS } from '../../AWS_keys'
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

function PullFiles(){
    const user = useContext(UserContext);
    return (
    axios.post("http://127.0.0.1:8000/home/", {user_email:user.state.userEmail})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          );
}

function Upload_S3(e){
  const config = {
  bucketName: 'googleaudio',
  dirName: 'user2__gmail.com', /* optional */
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

const useStyles = makeStyles(theme => ({
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
}));

export default function Profile(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const handleLogout = function(){
    delete localStorage.accessToken;
    auth.setAuth(false);
    props.history.push('/');
  }

  let response = PullFiles();
  console.log(response)

  if(auth.state.isAuthenticated){
    return(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleOutlinedIcon />
          </Avatar>
          <Typography component="h5">
            {user.state.userEmail}
          </Typography>

          <Button
            onClick={console.log(response)}
            fullWidth
            variant="contained"
            color="primary"
          >
            Upload Audio
          </Button>
          <input
          type = "file"
          onChange = {Upload_S3}
          accept="video/*,audio/*"
          />
          <Link
            to="#"
            onClick={handleLogout}
            variant="body2">
            {"Logout"}
          </Link>
        </div>

        <div className={classes.footer}>
          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
      </Container>
    )
  }
  else{
    return(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
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
        </div>

        <div className={classes.footer}>
          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
      </Container>
    )
  }
}
