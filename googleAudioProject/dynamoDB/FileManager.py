from __future__ import print_function # Python 2/3 compatibility
import decimal
import boto3
import json
from boto3.dynamodb.conditions import Key, Attr
from .UserManager import UserManager


# TODO: change to dynamodb = boto3.resource('dynamodb',region_name='us-east-2') when uploading project
dynamodb = boto3.resource('dynamodb', region_name='us-east-2', endpoint_url="http://localhost:8000")


class FileManager(object):
    def __init__(self, email, files):
        self.email = email
        self.files = files

    def add_user_repo(self):
        table = dynamodb.Table('files')
        response = table.put_item(
            Item={
                'email': self.email,
                'files': self.files,
            }
        )
        print("AddUserRepo succeeded:")
        print(json.dumps(response, indent=4, cls=DecimalEncoder))

