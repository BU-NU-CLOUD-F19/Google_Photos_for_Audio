from __future__ import print_function # Python 2/3 compatibility
import boto3

# TODO: change to dynamodb = boto3.resource('dynamodb',region_name='us-east-2') when uploading project
dynamodb = boto3.resource('dynamodb', region_name='us-east-2')

table = dynamodb.Table('users')

table.delete()

# table = dynamodb.Table('files')
#
# table.delete()