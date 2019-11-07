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
import { Table } from "react-bootstrap";
import { AWS } from '../../AWS_keys';
import ReactS3 from 'react-s3';

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

const AllContexts = React.createContext({
  user: UserContext,
  auth: AuthContext
});

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
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {files : []};
  }

  handleLogout = () => {
    let auth = this.context.auth;
    delete localStorage.accessToken;
    console.log(typeof(auth));
    auth.setAuth(false);
    // props.history.push('/');
  }

  PullFiles = async () => {
    let user = this.context;
    let currentComponent = this;
    return (
    axios.post("http://127.0.0.1:8000/home/", {user_email:user.state.userEmail})//user.state.userEmail})
          .then(function (response) {
            currentComponent.setState({files: response['data']})
            console.log(response['data']);
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
    await this.PullFiles();
  }

  render() {
    let user = this.context;
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xl">
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
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
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>File Name</th>
                {/* <th>File URL</th> */}
              </tr>
            </thead>
            <tbody>
              {this.state.files.map((file, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{file['file_name']}</td>
                    {/* <td>{file['file_url']}</td> */}
                  </tr>)
              })}
            </tbody>
          </Table>
        </div>
        {/* <div className={classes.footer}>
          <Box mt={8}>
            <Copyright />
          </Box>
        </div> */}
      </Container>
    )
  }
}

Profile.contextType = UserContext;
export default withStyles(useStyles)(Profile);



// export default function Profile(props) {
//   const classes = useStyles();
//   const user = useContext(UserContext);
//   const auth = useContext(AuthContext);

//   const handleLogout = function(){
//     delete localStorage.accessToken;
//     auth.setAuth(false);
//     props.history.push('/');
//   }

//   let response = PullFiles();
//   sleep(5);

//   // console.log("KJLFSDJLJKSFD");

//   // if (typeof response === 'Promise') {
//   //   console.log('hello there');
//   // } else {
//   //   console.log('jdfskla');
//   // }

//   // console.log(response);
//   // console.log('WHO KNOWS');

//   if(auth.state.isAuthenticated){
//     return(
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <AccountCircleOutlinedIcon />
//           </Avatar>
//           <Typography component="h5">
//             {user.state.userEmail}
//           </Typography>

//           <Button
//             // onClick={console.log(response)}
//             fullWidth
//             variant="contained"
//             color="primary"
//           >
//             Upload Audio
//           </Button>

//           <Link
//             to="#"
//             onClick={handleLogout}
//             variant="body2">
//             {"Logout"}
//           </Link>
//         </div>
//         {/* <div>{response}</div> */}
//         {/* <ul>
//         {
//         })}
//         </ul> */}

//         <div className={classes.footer}>
//           <Box mt={8}>
//             <Copyright />
//           </Box>
//         </div>
//       </Container>
//     )
//   }
//   else{
//     return(
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <WarningTwoToneIcon />
//           </Avatar>

//           <Typography variant="h4">
//             Not logged in.
//           </Typography>

//           <Typography variant="body1">
//             {"Please "}
//             <Link
//               to="/signIn"
//               variant="body2">
//               {"log in"}
//             </Link>
//             {" to access your profile."}
//           </Typography>
//         </div>

//         <div className={classes.footer}>
//           <Box mt={8}>
//             <Copyright />
//           </Box>
//         </div>
//       </Container>
//     )
//   }
// }

// const classes = useStyles();
//   const user = useContext(UserContext);
//   const auth = useContext(AuthContext);

// export default class Profile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {'data' : []};
//   }
  

//   handleLogout = () => {
//     delete localStorage.accessToken;
//     auth.setAuth(false);
//     props.history.push('/');
//   }

//   componentDidMount = () => {
//     let response = PullFiles().then(console.log('hello i returned'));
//     this.setState({'data' : response.data});
//   }

//   render() {

//     return (
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <div>
//             <Avatar>
//               <AccountCircleOutlinedIcon />
//             </Avatar>
//             <Typography component="h5">
//               "Test Email"
//             </Typography>
  
//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//             >
//               Upload Audio
//             </Button>
  
//             <Link
//               to="#"
//               variant="body2">
//               {"Logout"}
//             </Link>
//           </div>  
//           <div>
//             <Box mt={8}>
//               <Copyright />
//             </Box>
//           </div>
//         </Container>
//       );

//   }

// }
