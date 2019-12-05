import json
import time
import boto3
from urllib.request import urlopen
from boto3.dynamodb.conditions import Key, Attr


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
        user_email = file_name.split('/')[0]

        # terminate processing if file already existed
        table = dynamodb.Table('Audio')
        response = table.query(
            KeyConditionExpression=Key('email').eq(user_email)
        )
        count = response['Count']
        if count == 1:
            audio_list = response['Items'][0]['audio_files']
            for audio in audio_list:
                if audio['file_name'] == file_name.split('/')[1]:
                    return {
                        'statusCode': 500,
                        'body': json.dumps('Uploading failed. File already existed')
                    }

        s3_uri = create_uri(bucket_name, file_name)
        file_type = file_name.split('/')[1].split('.')[1]
        job_name = context.aws_request_id
        print(s3_uri)
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

        load_json = json.dumps(json_text)  # json(str) type

        # s3.put_object(Bucket = bucket_name, Key = "transcribeFile/{}.json".format(job_name),Body = load_json)
        transcript = json_text["results"]["transcripts"][0]["transcript"]

        # call Comprehend detect entities function to find keywords
        comprehend = boto3.client('comprehend')
        comprehend_response = comprehend.detect_entities(
            Text = transcript,
            LanguageCode ='en'
        )

        # extract keywords from the transcript and store in a list
        key_words = []
        entities = comprehend_response["Entities"]
        for i in entities:
            key_words.append(i["Text"])
        
        # put to DynamoDB table
        table = dynamodb.Table('Audio')

        response = table.query(
        KeyConditionExpression=Key('email').eq(user_email)
    )
        count = response['Count']
        audio_dic = {'transcript':transcript,'file_name':file_name.split('/')[1],'file_url':s3_uri,'key_words':key_words,}

        if count == 0:
            table.put_item(
                Item={
                    'email': user_email,
                    'audio_files': [audio_dic]
                }
            )
        elif count == 1:
            audio_list = response['Items'][0]['audio_files']
            audio_list.append(audio_dic)
            table.update_item(
                Key = {'email':user_email},
                UpdateExpression='SET audio_files = :val1',
                ExpressionAttributeValues={
                ':val1': audio_list
                }
            )
        return {
        'statusCode': 200,
        'body': json.dumps('Transcript has been stored into DynamoDB!')
        }
