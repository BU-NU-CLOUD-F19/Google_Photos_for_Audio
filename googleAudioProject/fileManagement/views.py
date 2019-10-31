from botocore.exceptions import ClientError
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import generics
import boto3

# user_email = 'user1gmail.com'
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Audio')


class Userfiles(generics.CreateAPIView):

    def post(self, request, *args, **kwargs):
        print("HERE!!!!!!!")
        user_email = request.data['user_email']
        print('success')
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
        # return Response(data=audio_info, status=200)
        return Response(data='hi', status=200)


        # return render(request, 'homepage.html', context)
