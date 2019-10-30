import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import axios from "axios";
import { UserContext } from "./UserProvider"
import { AuthContext } from "./AuthProvider"


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

export default function Profile(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const handleLogout = function(){
    delete localStorage.accessToken;
    auth.setAuth(false);
    props.history.push('/');
  }

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
          onClick={console.log(user)}
          fullWidth
          variant="contained"
          color="primary"
        >
          Upload Audio
        </Button>

        <Link
          to="#"
          onClick={handleLogout}
          variant="body2">
          {"Logout"}
        </Link>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
