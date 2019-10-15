from __future__ import print_function # Python 2/3 compatibility
import decimal
import boto3
import json
from boto3.dynamodb.conditions import Key, Attr


# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if abs(o) % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


# TODO: change to dynamodb = boto3.resource('dynamodb',region_name='us-east-2') when uploading project
dynamodb = boto3.resource('dynamodb', region_name='us-east-2', endpoint_url="http://localhost:8000")


class UserManager(object):
    def __init__(self, email, password):
        self.email = email.lower()
        self.password = password

    def new_user(self):
        table = dynamodb.Table('users')
        response = table.query(
            KeyConditionExpression=Key('email').eq(self.email)
        )
        if response.length == 0:
            return True
        else:
            return False

    def add_user(self):
        table = dynamodb.Table('users')
        response = table.put_item(
            Item={
                'email': self.email,
                'password': self.password,
            }
        )
        print("AddUser succeeded:")
        print(json.dumps(response, indent=4, cls=DecimalEncoder))

    def success_login(self):
        table = dynamodb.Table('users')
        response = table.query(
            KeyConditionExpression=Key('email').eq(self.email) & Key('password').eq(self.password)
        )
        if response.length != 0:
            return True
        else:
            return False






