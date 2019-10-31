import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import MUIDataTable from "mui-datatables";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import axios from "axios";
import { UserContext } from "./UserProvider";
import { Component } from "react";


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Google Audio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function HelloMessage(props) {
    return <h1>hello {props.name}</h1>;
}

function PullFiles(){
    return (
    axios.post("http://127.0.0.1:8000/home/", {user_email:'user1gmail.com'})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          );
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
  table: {
    margin: theme.spacing(1),
    minWidth: 400,
    size: 'small',
  },
}));

const config = {
        bucketName : 'googleaudio',
        dirName: 'user2gmail.com',
        region: 'us-east-2',
        accessKeyId: 'AKIAVJ45X5OX3IQLFQ6D',
        secretAccessKey: '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'
        };

export default function Profile(props) {
  const classes = useStyles();
  const user = useContext(UserContext);

  let name = React.createRef();
  let email = React.createRef();
  let password = React.createRef();
//  let files = PullFiles();

//  console.log(files);

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
//        <HelloMessage name="ggg" />
        <PullFiles />
      </div>

      <Button
        onClick={console.log(user)}
        fullWidth
        variant="contained"
        color="primary"
      >
        Upload Audio
      </Button>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

//export default class Profile extends Component{
//    constructor(props) {
//        super(props);
//    }
//
//    componentDidMount() {
//
//    }
//
//  const classes = useStyles();
//  const user = useContext(UserContext);
//
//  return(
//    <Container component="main" maxWidth="xs">
//      <CssBaseline />
//      <div className={classes.paper}>
//        <Avatar className={classes.avatar}>
//          <AccountCircleOutlinedIcon />
//        </Avatar>
//        <Typography component="h5">
//          {user.state.userEmail}
//        </Typography>
////        <HelloMessage name="ggg" />
//        <PullFiles />
//      </div>
//
//      <Button
//        onClick={console.log(user)}
//        fullWidth
//        variant="contained"
//        color="primary"
//      >
//        Upload Audio
//      </Button>
//
//      <Box mt={8}>
//        <Copyright />
//      </Box>
//    </Container>
//  )
//}

