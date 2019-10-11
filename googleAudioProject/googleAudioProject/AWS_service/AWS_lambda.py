import json
import time
import boto3
from urllib.request import urlopen


def create_uri(bucket_name, file_name):
    return "s3://"+bucket_name + '/' + file_name

def lambda_handler(event, context):
    transcribe = boto3.client('transcribe')
    s3 = boto3.client("s3")
    dynamodb = boto3.resource('dynamodb')

    if event:
        file_obj = event["Records"][0]
        bucket_name = str(file_obj["s3"]["bucket"]["name"])
        file_name = str(file_obj["s3"]["object"]["key"])
        user_name = file_name.split('/')[0]
        s3_uri = create_uri(bucket_name, file_name)
        file_type = file_name.split('.')[1]
        job_name = context.aws_request_id

        transcribe.start_transcription_job(TranscriptionJobName = job_name,
                                            Media = {"MediaFileUri" : s3_uri},
                                            MediaFormat = file_type,
                                            LanguageCode = "en-US")
        while True:
            status = transcribe.get_transcription_job(TranscriptionJobName = job_name)
            if status["TranscriptionJob"]["TranscriptionJobStatus"] in ["COMPLETED","FAILED"]:
                break
            print("It's in progress")
            time.sleep(5)

        load_url = urlopen(status["TranscriptionJob"]["Transcript"]["TranscriptFileUri"])
        json_text = json.load(load_url)  # dictionary
        # load_json = json.dumps(json_text)  # json(str) type
        # s3.put_object(Bucket = bucket_name, Key = "transcribeFile/{}.json".format(job_name),Body = load_json)
        
        
        # put to DynamoDB table
        table = dynamodb.Table('Transcribe_text')
        table.put_item(
            Item ={
                'User_ID' : user_name,
                'transcript' : transcript,
                'key_words' : key_words
            }
        )

    return {
        'statusCode': 200,
        'body': json.dumps('Transcript has been stored into DynamoDB!')
    }

