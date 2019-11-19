import React, { Component } from "react";
import ReactDOM from "react-dom";
// import ReactS3 from 'react-S3';

const config = {
        bucketName : 'googleaudio',
        dirName: 'user2gmail.com',
        region: 'us-east-2',
        accessKeyId: 'AKIAVJ45X5OX3IQLFQ6D',
        secretAccessKey: '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'
        };

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }
//  upload = (e) => {
//        console.log(e.target.files[0]);
//        ReactS3.upload(e.target.files[0],config)
//        .then( (data)=>{
//            console.log(data.location);
//        })
//        .catch( (err)=>{
//            alert(err);
//        })
//        }
  // upload(e) {
  //       console.log(e.target.files[0]);
  //       ReactS3.upload(e.target.files[0],config)
  //       .then( (data)=>{
  //           console.log(data.location);
  //       })
  //       .catch( (err)=>{
  //           alert(err);
  //       })
  //       }

  render(){
        return (
            <div>
                <h3>
                    Upload an audio file
                </h3>
                <input
                type = "file"
                onChange = {this.upload}
                />
            </div>
                );
        }
}

