from __future__ import print_function # Python 2/3 compatibility
import decimal
import boto3
import json
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
import hashlib, binascii, os
import re

regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'

def hash_password(password):
    """Hash a password for storing."""
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')


def verify_password(stored_password, provided_password):
    """Verify a stored password against one provided by user"""
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512',
                                  provided_password.encode('utf-8'),
                                  salt.encode('ascii'),
                                  100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password


# Helper class to convert a DynamoDB item to JSON.
# class DecimalEncoder(json.JSONEncoder):
#     def default(self, o):
#         if isinstance(o, decimal.Decimal):
#             if abs(o) % 1 > 0:
#                 return float(o)
#             else:
#                 return int(o)
#         return super(DecimalEncoder, self).default(o)


dynamodb = boto3.resource('dynamodb', region_name='us-east-2')


class UserManager(object):
    def __init__(self, email, password):
        self.email = email.lower()
        self.password = password

    def new_user(self):
        table = dynamodb.Table('users')
        response = table.query(
            KeyConditionExpression=Key('email').eq(self.email)
        )
        return response.get('Count') == 0

    def add_user(self):
        table = dynamodb.Table('users')
        response = table.put_item(
            Item={
                'email': self.email,
                'password': self.password,
            }
        )
        # print("AddUser succeeded:")
        # print(json.dumps(response, indent=4, cls=DecimalEncoder))

    def success_login(self):
        table = dynamodb.Table('users')
        try:
            response = table.get_item(
                Key={
                    'email': self.email
                }
            )
        except ClientError as e:
            print(e.response['Error']['Message'])
        else:
            user = response['Item']
            print("Get user succeeded:")
            print(user)
            provided_password = user.get('password')
            return verify_password(provided_password, self.password)
            # print(json.dumps(user, indent=4, cls=DecimalEncoder))


    # Check email validation 
    def check(self):  
        return re.search(regex,self.email)




