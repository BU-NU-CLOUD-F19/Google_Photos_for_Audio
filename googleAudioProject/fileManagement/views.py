from botocore.exceptions import ClientError
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import generics
from .serializers import FileSerializer

import boto3
# user_email = 'user1gmail.com'
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Audio')


class Userfiles(generics.CreateAPIView):
    serializer_class = FileSerializer

    def post(self, request, *args, **kwargs):
        user_email = request.data['user_email']
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
            return Response(data=audio_info, status=200)
        except:
            return Response(data='Audio files not loaded.', status=400)


        # return render(request, 'homepage.html', context)
