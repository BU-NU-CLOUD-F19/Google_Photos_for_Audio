import React, { useContext, Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
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
import ReactAudioPlayer from 'react-audio-player';

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
  input: {
    display: 'none',
  },
});

var divStyle = {
    textAlign:'right'
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false,
                  files : [],
                  filteredFiles : []
                };
  }

  handleLogout = () => {
    let user = this.context;
    delete localStorage.accessToken;
    user.setAuth(false);
    // props.history.push('/');
  }

  filterSearchFiles = (e) => {
    let keyword = e.target.value.toLowerCase();
    let filterFiles = [];
    let loginState = this.state.isLoggedIn;
    let allFiles = this.state.files;

    for (let i = 0; i < allFiles.length; i++) {
      let keywordInFile = false;
      let currentFile = allFiles[i];
      for (let j = 0; j < currentFile['key_words'].length; j++) {
        let lowerString = currentFile['key_words'][j].toLowerCase();
        if (lowerString.includes(keyword)) {
          keywordInFile = true;
          break;
        }
      }

      if (keywordInFile) {
        filterFiles.push(currentFile);
      }
    }

    this.setState({isLoggedIn: loginState,
                   files: allFiles,
                   filteredFiles: filterFiles});
  }

  PullFiles = async () => {
    let user = this.context;
    let currentComponent = this;

    return (
    axios.post("http://127.0.0.1:8000/home/", {user_email: user.state.userEmail})
          .then(function (response) {
            if (Array.isArray(response['data'])) {
              currentComponent.setState({isLoggedIn: user.state.isAuthenticated,
                                         files: response['data'],
                                         filteredFiles: response['data']});
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
        alert("File processing.");
      })
      .catch((err)=>{
        alert(err);
      })
    )
  }
  refreshFiles = async (e) => {
    await this.PullFiles();
  }

  async componentDidMount() {
    let user = this.context;
    this.setState({isLoggedIn: user.state.isAuthenticated, files: [], filteredFiles: []});
    await this.PullFiles();
  }
  // onRead = () => {
  //     let user = this.context;
  //     let user_email = user.state.userEmail;
  //     let new_email = user_email.replace('@', '__');
  //     AWS.config.update({
  //       region: 'us-east-2',
  //       endpoint: 'dynamodb.us-east-2.amazonaws.com',
  //       accessKeyId: AWS.accessKeyId,
  //       secretAccessKey: AWS.secretAccessKey,
  //       });
  //     var dynamodb = new AWS.DynamoDB();
  //     var params = {
  //         ExpressionAttributeValues: {
  //             ":v1": {
  //                 S: new_email,
  //             }},
  //         KeyConditionExpression: "email = :v1",
  //         ProjectionExpression: "audio_files",
  //         TableName: "Audio"
  //     };
  //     dynamodb.query(params, function(err, data))
  //         .then((data)=> {
  //             console.log(data);
  //             audio_list = data.items()
  //
  //       count = response['Count']
  //       if count == 1:
  //           audio_list = response['Items'][0]['audio_files']
  //           for audio in audio_list:
  //               if audio['file_name'] == file_name.split('/')[1]:
  //                   return {
  //                       'statusCode': 500,
  //                       'body': json.dumps('Uploading failed. File already existed')
  //         })
  //         .catch((err)=>{
  //             alert(err);
  //         })
  //     };
  // }

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
      console.log(e),
      console.log(e.target.files[0]),
      ReactS3.uploadFile(e.target.files[0], config)
      .then((data)=>{
        console.log(data);
        alert("File processing.");
      })
      .catch((err)=>{
        alert(err);
      })
    )
  }



  async componentDidMount() {
    let user = this.context;
    this.setState({isLoggedIn: user.state.isAuthenticated, files: [], filteredFiles: []});
    await this.PullFiles();
  }

  render() {
    let user = this.context;
    let user_email = user.state.userEmail;
    let new_email = user_email.replace('@', '__');
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

                  <input
                    id="upload-button"
                    className={classes.input}
                    type = "file"
                    onChange = {this.Upload_S3}
                    accept="video/*,audio/*"
                  />
                  <label htmlFor="upload-button">
                    <Button
                      // onClick={console.log(response)}
                      // fullWidth
                      variant="contained"
                      component="span"
                      color="primary"
                    >
                      Upload Audio
                    </Button>
                  </label>

                  <Link
                    to="/"
                    onClick={this.handleLogout}
                    variant="body2">
                    {"Logout"}
                  </Link>
                  <br />
                  <div>
                      <Button variant="contained"
                      component="span"
                      size="small"
                      color="default"
                      style={{justifyContent: 'right'}}
                      onClick={()=> {this.refreshFiles()}}>Refresh table</Button>
                  </div>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item xs={7}>
                      <TextField
                        // inputRef={this.inputSearchValue}
                        onChange={this.filterSearchFiles}
                        className={classes.textField}
                        id="search"
                        label="Search your files"
                        type="search"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        // inputRef={this.inputSearchType}
                        onChange={this.filterSearchFiles}
                        className={classes.textField}
                        select
                        value=''
                        id="search-select"
                        label="Search by"
                        fullWidth
                        variant="outlined"
                      >
                        <MenuItem value={"filename"}>Filename</MenuItem>
                        <MenuItem value={"keyword"}>Keyword</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        // onClick={this.handleSearchSubmit}
                        variant="contained"
                        color="primary"
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>

                  {/* <Table striped bordered hover size="sm"> */}
                  <div>
                  {this.state.filteredFiles.map((file, index) => {
                        return (
                          <ExpansionPanel key={index}>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>{file['file_name']}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div>
                                    <ReactAudioPlayer
                                        //autoPlay
                                        controls
                                        src={"https://googleaudio.s3.us-east-2.amazonaws.com/" + new_email + "/"+ file['file_name']}
                                    />
                                <div>
                                  <Typography>
                                    Transcript
                                  </Typography>
                                </div>
                                <div>
                                  <Typography>
                                    {file['transcript']}
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
                  <Link
                    to="/"
                    onClick={this.handleLogout}
                    variant="body2">
                    {"Logout"}
                  </Link>
                  <br />
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item xs={7}>
                      <TextField
                        // inputRef={this.inputSearchValue}
                        onChange={this.filterSearchFiles}
                        className={classes.textField}
                        id="search"
                        label="Search your files"
                        type="search"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        // inputRef={this.inputSearchType}
                        onChange={this.filterSearchFiles}
                        className={classes.textField}
                        select
                        value=''
                        id="search-select"
                        label="Search by"
                        fullWidth
                        variant="outlined"
                      >
                        <MenuItem value={"filename"}>Filename</MenuItem>
                        <MenuItem value={"keyword"}>Keyword</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        // onClick={this.handleSearchSubmit}
                        variant="contained"
                        color="primary"
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>

                  {/* <Table striped bordered hover size="sm"> */}
                  <div>
                  {this.state.filteredFiles.map((file, index) => {
                        return (
                          <ExpansionPanel key={index}>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>{file['file_name']}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div>
                                    <ReactAudioPlayer
                                        //autoPlay
                                        controls
                                        src={"https://googleaudio.s3.us-east-2.amazonaws.com/" + new_email + "/"+ file['file_name']}
                                    />
                                <div>
                                  <Typography>
                                    Transcript
                                  </Typography>
                                </div>
                                <div>
                                  <Typography>
                                    {file['transcript']}
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
        <br />
      </Container>
    )
  }
}

Profile.contextType = UserContext;
export default withStyles(useStyles)(Profile);
