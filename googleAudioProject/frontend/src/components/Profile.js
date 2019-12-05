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
import { AWS_credentials } from '../../AWS_keys';

import ReactS3 from 'react-s3';
import S3FileUpload from 'react-s3';
import { deleteFile } from 'react-s3';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';
import DeleteIcon from '@material-ui/icons/Delete';


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
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import Input from "@material-ui/core/Input";


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
  floatComponent: {
    flexGrow: 1,
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
                  filteredFiles : [],
                  selectedMenuItem : 'keyword'
                };
  }

  handleLogout = () => {
    let user = this.context;
    delete localStorage.accessToken;
    user.setAuth(false);
    // props.history.push('/');
  }

  filterSearchFiles = (e) => {
    let parameter = this.state.selectedMenuItem;
    console.log(parameter)
    if (parameter == 'filename') {
      let AudioName = e.target.value.toLowerCase();
      let filterFiles = [];
      let loginState = this.state.isLoggedIn;
      let allFiles = this.state.files;

      for (let i = 0; i < allFiles.length; i++) {
        let filenameInFile = false;
        let currentFile = allFiles[i];
        let lowerString = currentFile['file_name'].toLowerCase();
        if (lowerString.includes(AudioName)) {
          filenameInFile = true;
        }
        if (filenameInFile) {
          filterFiles.push(currentFile);
        }
      }

      this.setState({isLoggedIn: loginState,
                     files: allFiles,
                     filteredFiles: filterFiles,
                     selectedMenuItem: parameter
                    });
    }
    else{
      let keywords = e.target.value.toLowerCase();
      var keyArray = keywords.split(' ');
      let loginState = this.state.isLoggedIn;
      let allFiles = this.state.files;
      let allFilterFiles = []
      for (let n = 0; n < keyArray.length; n++) {
      // first layer, go through given key words
        let keyword = keyArray[n];
        let filterFiles = [];
        for (let i = 0; i < allFiles.length; i++) {
        // second layer, go through files
          let keywordInFile = false;
          let currentFile = allFiles[i];
          for (let j = 0; j < currentFile['key_words'].length; j++) {
          // third  layer, go through key words in dynamoDB
            let lowerString = currentFile['key_words'][j];
            // if not the last keyword, given keywords have to match
            if (n!=keyArray.length-1){
              if (lowerString==keyword) {
                keywordInFile = true;
                break;
              }
            }
            // if is the last keyword, given keyword has to involved
            else{
              if (lowerString.includes(keyword)) {
                keywordInFile = true;
                break;
              }
            }
          }

          if (keywordInFile) {
            filterFiles.push(currentFile);
          }
        }
        if (n==0){
          allFilterFiles = filterFiles;
        }
        if (filterFiles==[]){
          allFilterFiles = [];
          break;
        }
        else{
        // find the intersection of two list
          allFilterFiles = allFilterFiles.filter(v => filterFiles.includes(v))
        }
      }

      this.setState({isLoggedIn: loginState,
                     files: allFiles,
                     filteredFiles: allFilterFiles,
                     selectedMenuItem:parameter});
    }
  }

selectedMenu = (e) => {
  let loginState = this.state.isLoggedIn;
  let allFiles = this.state.files;
  let filterFiles = this.state.filteredFiles;
  this.setState({
        isLoggedIn: loginState,
        files: allFiles,
        filteredFiles: filterFiles,
        selectedMenuItem : e.target.value
    },()=>{
   console.log(this.state.selectedMenuItem)
    });
  this.filterSearchFiles;
}

  PullFiles = async () => {
    let user = this.context;
    let currentComponent = this;
    let MenuItem = this.state.selectedMenuItem;
    return (
    axios.post("http://127.0.0.1:8000/home/", {user_email: user.state.userEmail})
          .then(function (response) {
            if (Array.isArray(response['data'])) {
              currentComponent.setState({isLoggedIn: user.state.isAuthenticated,
                                         files: response['data'],
                                         filteredFiles: response['data'],
                                         selectedMenuItem: MenuItem});
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
      accessKeyId: AWS_credentials.accessKeyId,
      secretAccessKey: AWS_credentials.secretAccessKey,
    }
    return(
      console.log(e),
      console.log(e.target.files[0]),

      ReactS3.uploadFile(e.target.files[0], config)
      .then((data)=>{
        console.log(data);
        alert("File processing...\n\n" +
            "It will take some time to finish the transcription. " +
            "Please click on the REFRESH button after a few minutes to see the updated file list.");
      })
      .catch((err)=>{
        alert(err);
      })
    )
  }

  deleteFiles = (filename) => {
    let user = this.context;
    let user_email = user.state.userEmail;
    let new_email = user_email.replace('@', '__');

    var AWS = require('aws-sdk');
    AWS.config.update({region: 'us-west-2', credentials: AWS_credentials});

    var s3 = new AWS.S3();
    var params = {
      Bucket: 'googleaudio', /* required */
      Key: new_email + '/' + filename, /* required */
    };

    return(
      s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      })

    )
  }

  refreshFiles = async (e) => {
    await this.PullFiles();
  }

  async componentDidMount() {
    let user = this.context;
    this.setState({isLoggedIn: user.state.isAuthenticated, files: [], filteredFiles: [],selectedMenuItem:''});
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
                  <Typography component="h4">
                      {"Welcome, " + user.state.userEmail + "!"}
                  </Typography>
                  <br />

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
                      Upload File
                    </Button>
                  </label>
                 <br />

                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item xs={8}>
                      <TextField
                        onChange = {this.filterSearchFiles}
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
                        onChange = {this.selectedMenu}
                        className={classes.textField}
                        select
                        defaultValue="keyword"
                        value={ this.state.selectedMenuItem }
                        id="search-select"
                        label="Search by"
                        fullWidth
                        variant="outlined"
                      >
                        <MenuItem value={"filename"}>Filename</MenuItem>
                        <MenuItem value={"keyword"}>Keyword</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton onClick={()=> {this.refreshFiles()}}>
                        <RefreshIcon />
                      </IconButton>
                    </Grid>
                  </Grid>

                  <div>
                  {this.state.filteredFiles.map((file, index) => {
                    let fileType = file['file_name'].split('.')[1]
                    let isAudio = (fileType === "mp3" || fileType === 'wav' || fileType === 'wmv')

                    return (
                          <ExpansionPanel key={index} defaultExpanded={false}>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header">
                              <Typography>{file['file_name']}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                              <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    spacing={1}
                              >
                                  <Grid>
                                    {(isAudio) ?
                                        <ReactAudioPlayer
                                        //autoPlay
                                        controls
                                        src={"https://googleaudio.s3.us-east-2.amazonaws.com/" + new_email + "/" + file['file_name']}
                                        /> :
                                        <ReactPlayer
                                            url={'https://googleaudio.s3.us-east-2.amazonaws.com/' + new_email + '/' + file['file_name']}
                                            className='react-player'
                                            //playing
                                            controls
                                            width='100%'
                                            height='100%'
                                          />
                                    }
                                  </Grid>
                                <Grid>
                                 <br />
                                  <Grid
                                        container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="center"
                                        spacing={1}
                                      >
                                    <Grid>
                                      <Button
                                          color="secondary"
                                          aria-label="delete"
                                          onClick={this.deleteFiles.bind(this,file['file_name'])}>
                                        <DeleteIcon />
                                      </Button>
                                    </Grid>
                                    <Grid>
                                      <Typography color={"secondary"}> {"---->> Caution! The deletion on click CANNOT be reverted!"}</Typography>
                                    </Grid>
                                  </Grid>
                                  </Grid>
                                <Grid>
                                  <br />
                                </Grid>
                                <Grid>
                                  <ExpansionPanel style={{border: '1px solid rgba(0, 0, 0, .125)', boxShadow: 'none'}} defaultExpanded={false}>
                                    <ExpansionPanelSummary
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <Typography>{"Transcript"}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                      {file['transcript']}
                                    </ExpansionPanelDetails>
                                  </ExpansionPanel>
                                  <ExpansionPanel style={{border: '1px solid rgba(0, 0, 0, .125)', boxShadow: 'none'}} defaultExpanded={false}>
                                    <ExpansionPanelSummary
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <Typography>{"Keywords"}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                      {file['key_words'].join(', ')}
                                    </ExpansionPanelDetails>
                                  </ExpansionPanel>
                                </Grid>
                              </Grid>
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
        <br />
      </Container>
    )
  }
}

Profile.contextType = UserContext;
export default withStyles(useStyles)(Profile);
