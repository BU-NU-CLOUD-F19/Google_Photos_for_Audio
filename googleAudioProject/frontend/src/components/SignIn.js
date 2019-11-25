import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  let inputEmail = React.createRef();
  let inputPassword = React.createRef();

  const handleEmailChange = function(){
    user.setEmail(inputEmail.current.value);
    console.log("email: " + inputEmail.current.value);
  }
  const handlePassChange = function(){
    console.log("pass: " + inputPassword.current.value);
  }
  const handleLogin = function(){
    axios.post("http://127.0.0.1:8000/login/", {email: inputEmail.current.value,
                                                password: inputPassword.current.value})
          .then(function (response) {
            console.log(response);
            localStorage.accessToken = response.data.access;
            auth.setAuth(true);
            user.setAuth(true);
            props.history.push('/profile');
          })
          .catch(function (error) {
            console.log(error);
            switch (error.response.status) {
              case 524:
                alert('Incorrect password!');
                break;
              case 523:
                alert("Email address doesn't exist! Please register first or enter a valid email address.");
                break;
              default:
                break;
            }
          })
  }

  return (

    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            onChange={handleEmailChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={inputEmail}
            autoFocus
          />
          <TextField
            onChange={handlePassChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputRef={inputPassword}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            onClick={handleLogin}
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
