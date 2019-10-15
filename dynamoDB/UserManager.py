from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
from googleAudioProject.userManagement.models import CustomUser

# TODO: change to dynamodb = boto3.resource('dynamodb',region_name='us-east-2') when uploading project
dynamodb = boto3.resource('dynamodb', region_name='us-east-2', endpoint_url="http://localhost:8000")

class userRegister(email,password):
    email = email

    table = dynamodb.Table('users')
    response = table.query(
        KeyConditionExpression=Key('email').eq(email)
    )
