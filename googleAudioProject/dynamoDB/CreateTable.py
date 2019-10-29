
# To call CreateTable function, use python CreateTable.py

from __future__ import print_function # Python 2/3 compatibility
import boto3

# TODO: change to dynamodb = boto3.resource('dynamodb',region_name='us-east-2') when uploading project
dynamodb = boto3.resource('dynamodb', region_name='us-east-2')

# Create "users" table in dynamoDB
Table = dynamodb.create_table(
    TableName='users',
    KeySchema=[
        {
            'AttributeName': 'email',
            'KeyType': 'HASH'  # Partition key. Must be unique!
        },
    ],
    AttributeDefinitions=[
        {
            'AttributeName': 'email',
            'AttributeType': 'S'
        },
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 10,
        'WriteCapacityUnits': 10
    }
)

# Wait until the table exists.
Table.meta.client.get_waiter('table_exists').wait(TableName='users')
print("Table status:", Table.table_status)

# # Create "files" table in dynamoDB
# Table = dynamodb.create_table(
#     TableName='files',
#     KeySchema=[
#         {
#             'AttributeName': 'email',
#             'KeyType': 'HASH'  # Partition key. Must be unique!
#         },
#     ],
#     AttributeDefinitions=[
#         {
#             'AttributeName': 'email',
#             'AttributeType': 'S'
#         },
#     ],
#     ProvisionedThroughput={
#         'ReadCapacityUnits': 10,
#         'WriteCapacityUnits': 10
#     }
# )
#
# # Wait until the table exists.
# Table.meta.client.get_waiter('table_exists').wait(TableName='files')
# print("Table status:", Table.table_status)
