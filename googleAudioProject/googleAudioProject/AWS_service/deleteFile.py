import json
import time
import boto3
from urllib.request import urlopen
from boto3.dynamodb.conditions import Key, Attr
import json
from botocore.exceptions import ClientError


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Audio')

    if event:
        file_obj = event["Records"][0]
        all_name = str(file_obj["s3"]["object"]["key"])
        file_name = all_name.split('/')[1]
        user_email = all_name.split('/')[0]

    # delete file data from DynamoDB
    print("Attempting a conditional delete...")

    try:
        response = table.query(
            KeyConditionExpression=Key('email').eq(user_email)
        )
        file_list = response['Items'][0]['audio_files']
        for file in file_list:
            if file['file_name'] == file_name:
                file_list.remove(file)
                table.update_item(
                    Key={
                        'email': user_email,
                    },
                    UpdateExpression="set audio_files = :a",
                    ExpressionAttributeValues={
                        ':a': file_list,
                    },
                    # ReturnValues="UPDATED_NEW"
                )
                print("Filelist updated!")
                break

    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])
        else:
            raise
    else:
        return {
            'statusCode': 200,
            'body': json.dumps('DeleteItem succeeded!')
        }
