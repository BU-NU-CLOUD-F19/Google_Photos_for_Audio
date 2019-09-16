# Google_Photos_for_Audio

### Team members: Mengting Song, Damani Philip, Benjamin Chan,  Yuncheng Zhu
### Mentor: Hung Tran

## 1. Vision and Goals Of The Project
Google Photos for Audio/Video will establish a website similar to “Google Photo”. On a high level, users can come to the site to upload their media files; the audio in these files will then be transcribed, allowing users to search for media using words found in their audio/video content.

High-level goals including:
* Building a user-friendly website that allows users to upload/download and use specific keywords to search for audios/videos.
* Utilizing AWS services like AWS S3, Lambda, Transcribe Service, DynamoDB, Comprehend for cloud platform, storage, audio/video-to-text translation, text analysis, etc. functions.

## 2. Users/Personas Of The Project
Google Photos for Audio will be used by people who want to store and organize audio/video files in a user-searchable manner on the cloud. These people include journalists, academic researchers, and reporters who need to be able to search through the files with keywords.

## 3. Scope and Features Of The Project

## 4. Solution Concept
A high-level architecture of the Project:
![Image text](https://github.com/MengtingSong/Google_Photos_for_Audio/blob/master/architecture.png)


## 5. Acceptance criteria

## 6. Release Planning
1. Release #1 (due by Week 5): 

Overall structure and interfaces establishment, and user register/login module completion, integrating with Amazon S3 and DynamoDB: 
* Establish the structure of the overall system and respective module including:
  * User register/login
  * User management (including user account creation, update, data retrieve and deletion)
  * Audio File Management (including audio storage, retrieve, update and deletion)
  * Audio File Transcription (including transcription storage, retrieve, update and deletion)
* User register/login module completion
  * Identify user account data structure (username, password, audio file object, audio object, ...)
  * New user account establishment
  * User login check
* Test
  * Write dummy code to test overall structure and module interfaces

2. Release #2 (due by Week 7): 

Audio File Management module completion, integrating with Amazon S3, AWS DynamoDB:
* Identify audio file data structure (audio title, audio, uploaded time, transcription status, ...)
* Realize audio file uploading/storing, downloading/retrieve, deletion, search by title/time, ...
* Test

3. Release #3 (due by Week 9): 

Audio File Transacription module completion, integrating with AWS Lambda, AWS Comprehend and AWS DynamoDB:
* Update audio file data structure (audio pointer, raw transcription, keywords, ...) 
* Realize audio file transcription (integrate with AWS Comprehend service)
* Realize audio file transcription and keywords storing, retrieve, deletion, update, search, ...
* Test

4. Release #4 (due by Week 11): 

Front-end website design and integration with back-end system. 
Front-end website contains functions as below:
* User register/log-in
* User audio file list display
* Audio file uploading and keywords analysis
* Uploaded audio file analysis result display and editing
* Audio management including playing, deleting, and adding keywords (pending)
* Audio search by keywords and search result display
* ...

5. Release #5 (due by Week 13): 

Test and stretch feature realization.
