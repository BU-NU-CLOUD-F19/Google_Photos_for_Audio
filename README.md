# Google_Photos_for_Audio

### Team members: Mengting Song, Damani Philip, Benjamin Chan,  Yuncheng Zhu
### Mentor: Hung Tran

## 3rd Presentation:
https://drive.google.com/open?id=1yE0CfFCXOqZv5WyXfxjzHbNH-VXPHeHXS8PJlop5yF4

## 2nd Presentation:
https://docs.google.com/presentation/d/1P8sDvwWMZO4az-FHJvorB3qE2Jd7LpmkNERJNCClKQY/edit#slide=id.g63d94f3009_0_208

## 1st Presentation:
https://docs.google.com/presentation/d/1DKc6HNFBpreAhHW4wiEahErnnkVCoF6U2zxHVuzRsHo/edit#slide=id.p

## 1. Vision and Goals Of The Project
Google Photos for Audio/Video will establish a website similar to “Google Photo”. On a high level, users can come to the site to upload their media files; the audio in these files will then be transcribed, allowing users to search for media using words found in their audio/video content.

High-level goals including:
* Building a user-friendly website that allows users to upload/download and use specific keywords to search for audios/videos.
* Utilizing AWS services like AWS S3, Lambda, Transcribe Service, DynamoDB, Comprehend for cloud platform, storage, audio/video-to-text translation, text analysis, etc. functions.

## 2. Users/Personas Of The Project
* Google Photos for Audio will be used by people who want to store and organize audio/video files in a user-searchable manner on the cloud. 
* These people include journalists, academic researchers, and reporters who need to be able to search through the files with keywords.

## 3. Scope and Features Of The Project
This project provides basic functionality of a site like Google Photos but for audio clips. Below is an overview of the program features from the perspective of the program architecture.

- Front end
  - provides user-friendly UI
    - displays a user’s audio files in a grid/list sorted by date uploaded
  - allows users to login/register using Amazon/Google sign-in forms
  - allows users to upload audio files from their computer’s file system
  - allows users to search for audio using text
  - allows users to delete audio files
- Back end
  - audio file management
    - retrieve an audio file
    - store new/uploaded audio file
    - update status of audio file (has it been transcribed or not)
    - delete audio file
  - audio file transcription
    - transcribes stored audio clips into text
    - extract keywords or major topics of texts
    - store transcribed texts
    - delete transcription
  - user management
    - create a new user in the system
    - retrieve user details
    - update a user’s details
    - delete a user
    
This project is not a social media platform where uploaded content is shared to users that are subscribed to the publisher. While sharing is a stretch feature, it would be in the form of sharing an item on Google Photos with another user, not posting to a live feed. 

## 4. Solution Concept
### High-Level architecture and goals:
* Upload the media files in Amazon S3, an object storage service.
* An upload event will be pushed to AWS Pub/Sub topic.
* Use AWS Lambda to watch for the pubsub topic.
* Use AWS Transcribe and Comprehend to process the uploaded file to translate audio to text.
* Store the analysis result and user data into AWS DaynamoDB, queryable by our website.
* The site will be run by AWS Lambda, while storing backend code on S3.
The diagram of whole project's structure is as followed.
![Image text](https://github.com/BU-NU-CLOUD-F19/Google_Photos_for_Audio/blob/master/project_architecture.png)
### Design Implications and Discussion
* Why we choose AWS not GCP  
Actually they are pretty similar and brand new for most of us. Both have strong function on cloud and database. After do some research we found that AWS have some more understandable tutorials to followed and perhaps have a larger user group, so we choose AWS instead of GCP.
* Why DynamoDB not MongoDB  
First we decide to choose NoSql instead of Sql database. Sql databse is better when the data type is stable, but when it comes to performance, like a lot of users using at the same time, searching for some words, NoSql is faster. One more reason is NoSql is easier to implement and no need to create the structure/table.   
And Dynamo and MongoDB are both NoSQL databases. DynamoDB is popular in the gaming industry as well as in the internet of things (IoT) industry. One fearure of DynamoDB is that you can’t have embedded data structures like you can with MongoDB. But Since we've already decided to use the AWS stack and we need a NoSQL database, then DynamoDB is a no-brainer.
* Why Django not Node.js  
We decide to use Django to implement our website. It's a powerful web framework and can build a website quickly, some of us had used it before. And we had considered about using NodeJS. So the Node.js is a convenient tool to write javascript code on server side. And for now, Node is perhaps the hippest, the trendiest IT technology for people to learning right now. But the drawback is it's heavy for a new starter. So in this aspect, Django is better.
## 5. Acceptance criteria
* Minimum acceptance criteria is a website which support upload media files and search by words operations.

## 6. Release Planning
1. Release #1 (due by Week 5): 

Overall structure and interfaces establishment, and user register/login module completion, integrating with Amazon S3 and AWS DynamoDB, Lambda: 
* Design the preliminary version of frontend website
* Establish the structure of the overall system and respective module including:
  * User register/login
  * User management (including user account creation, update, data retrieve and deletion)
  * Audio File Management (including audio storage, retrieve, update and deletion)
  * Audio File Transcription (including transcription storage, retrieve, update and deletion)
* Integrate with AWS Lambda and S3 to run the website
  * Store backend code on S3
  * Triger Lambda to run the website
* User register/login module completion
  * Identify user account data structure (username, password, audio file object, audio object, ...)
  * New user account establishment
  * User login check
* Test
  * Write dummy code to test overall structure and module interfaces

2. Release #2 (due by Week 7): 

Audio File Management module completion, integrating with Amazon S3, AWS DynamoDB, Lambda:
* Identify audio file data structure (audio title, audio, uploaded time, transcription status, ...)
* Realize audio file uploading/storing, downloading/retrieve, deletion, search by title/time, ...
* Test

3. Release #3 (due by Week 9): 

Audio File Transacription module completion, integrating with AWS Lambda, AWS Transcribe, Comprehend, S3 and DynamoDB:
* Update audio file data structure (audio title/reference, transcription, keywords, ...) 
* Realize audio file transcription (integrate with AWS Transcribe and Comprehend service)
* Realize audio file transcription and keywords storing, retrieve, deletion, update, search, ...
* Test

4. Release #4 (due by Week 11): 

User-friendly design of front-end website whch contains functions as below:
* User register/log-in
* User audio file list display
* Audio file uploading and keywords analysis
* Uploaded audio file analysis result display and editing
* Audio management including playing, deleting, and adding keywords (pending)
* Audio search by keywords and search result display
* ...

5. Release #5 (due by Week 13): 

Test and stretch feature realization.
