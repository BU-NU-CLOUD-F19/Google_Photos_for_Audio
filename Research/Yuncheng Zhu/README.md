# Research of Vision and Goals Of The Project

Google Photos for Audio will be a full-stack project. The minimum viable product would meet the requirement that:
* Users can upload media files in the front-end
* Users can search for media using words found in their audio content.  
High-Level architecture and goals:
* Store the media files in cloud platform (GCP/AWS)
* Use a GCP Cloud Function or AWS Lambda or k8s to watch for the pubsub topic and process the uploaded file to translate
 audio to text, using GCP Cloud Speech-to-text or AWS Transcribe service.
* Store the analysis result into a database, queryable by our website.
* The site can run on either a Virtual Machine (VM) or as a K8s service.  
Strech Goal:
* Automate the creation of various cloud resources using an infrastructure-as-code framework like Terraform.
