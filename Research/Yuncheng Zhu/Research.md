# Research on vision and goals of our project

Google Photos for Audio will be a full-stack project. The <strong>minimum viable product</strong> would meet the requirement that:
* Users can upload media files in the front-end
* Users can search for media using words found in their audio content.  
### High-Level architecture and goals:
* Upload the media files in object storage service like Google Cloud Storage (GCS) or S3.
* An upload event will be pushed to a GCP or AWS Pub/Sub topic, or a self-deployed Kafka instance for the extra challenge.
* Use a GCP Cloud Function or AWS Lambda or k8s(if ambitious) to watch for the pubsub topic and process the uploaded file to translate audio to text, using GCP Cloud Speech-to-text or AWS Transcribe service.
* Store the analysis result into a database, queryable by our website.
* The site can run on either a Virtual Machine (VM) or as a K8s service.  
### Strech Goal:
* Automate the creation of various cloud resources using an infrastructure-as-code framework like Terraform.

### The features of Google Photo:  
Since Google Photos is similar to our project, we list some functions and features of it.  
* Upload photos is available by dragging or clicking on upload button.  
* Default albums are devided by photos' theme: people, places, things... and also in media's type: Videos, Movies.  
And of course users can create new albums with whatever names they want.
* Account and Sharing mechanism  
* Print service (which is needless for our project)
* Trash 
* Settings which manage the quality of photos, preferences for sharing, etc.