from botocore.exceptions import ClientError
from django.shortcuts import render
import boto3

user_email = 'user1gmail.com'
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Audio')
def userpage(request):
    try:
        response = table.get_item(
            Key={
                'email': user_email
            }
        )
        audio_info = response['Item']['audio_files']
        print(audio_info)
        context = {}
        context['email'] = user_email
        context['Info'] = audio_info
    except ClientError as e:
        print(e.response['Error']['Message'])
        print("The user doesn't exist")

    return render(request, 'userpage.html', context)

