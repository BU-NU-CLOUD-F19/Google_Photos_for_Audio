# Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# This file is licensed under the Apache License, Version 2.0 (the "License").
# You may not use this file except in compliance with the License. A copy of the
# License is located at
#
# http://aws.amazon.com/apache2.0/
#
# This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
# OF ANY KIND, either express or implied. See the License for the specific
# language governing permissions and limitations under the License.

import logging
import boto3
from botocore.exceptions import ClientError
from smart_open import smart_open
import configparser
# If cannot import smart_open, go to terminal pip/pip3 install smart_open

settings = configparser.ConfigParser()
settings.read('../../config.ini')
bucket_name = settings.get('AWS_S3', 'bucket_name')


class S3_API():
    def create_bucket(self, bucket_name, region=None):
        """Create an S3 bucket in a specified region

        If a region is not specified, the bucket is created in the S3 default
        region (us-east-1).

        :param bucket_name: Bucket to create
        :param region: String region to create bucket in, e.g., 'us-west-2'
        :return: True if bucket created, else False
        """

        # Create bucket
        try:
            if region is None:
                s3_client = boto3.client('s3')
                s3_client.create_bucket(Bucket=bucket_name)
            else:
                s3_client = boto3.client('s3', region_name=region)
                location = {'LocationConstraint': region}
                s3_client.create_bucket(Bucket=bucket_name,
                                        CreateBucketConfiguration=location)
        except ClientError as e:
            logging.error(e)
            return False
        return True

    def bucket_exists(self, bucket_name):
        """Determine whether bucket_name exists and the user has permission to access it

        :param bucket_name: string
        :return: True if the referenced bucket_name exists, otherwise False
        """

        s3 = boto3.client('s3')
        try:
            response = s3.head_bucket(Bucket=bucket_name)
        except ClientError as e:
            logging.debug(e)
            return False
        return True

    def list_bucket_objects(self, bucket_name):
        """List the objects in an Amazon S3 bucket

        :param bucket_name: string
        :return: List of bucket objects as dictionary. If error, return None.
        """

        # Retrieve the list of bucket objects
        s3 = boto3.client('s3')
        try:
            response = s3.list_objects_v2(Bucket=bucket_name)
        except ClientError as e:
            # AllAccessDisabled error == bucket not found
            logging.error(e)
            return None
        return response['Contents']

    def get_object(self, bucket_name, object_name):
        """Retrieve an object from an Amazon S3 bucket

        :param bucket_name: string
        :param object_name: string
        :return: botocore.response.StreamingBody object. If error, return None.
        """

        # Retrieve the object
        s3 = boto3.client('s3')
        try:
            response = s3.get_object(Bucket=bucket_name, Key=object_name)
        except ClientError as e:
            # AllAccessDisabled error == bucket or object not found
            logging.error(e)
            return None
        # Return an open StreamingBody object
        return response['Body']

    def print_object_content(self, bucket_name, object_name, folder_name=None):
        """Print txt objects content by line

        :param bucket_name: string
        :param object_name: string
        :param folder_name: string. If not specified print S3 object directly
        :return: None
        """
        if folder_name:
            smart_url = 's3://' + bucket_name + '/' + folder_name + '/' + object_name
        else:
            smart_url = 's3://' + bucket_name + '/' + object_name
        for line in smart_open(smart_url, 'rb'):
            print(line.decode('utf8'))

    def upload_file(self, file_name, bucket, object_name=None):
        """Upload a file to an S3 bucket

        :param file_name: File to upload
        :param bucket: Bucket to upload to
        :param object_name: S3 object name. If not specified then same as file_name
        :return: True if file was uploaded, else False
        """

        # If S3 object_name was not specified, use file_name
        if object_name is None:
            object_name = file_name

        # Upload the file
        s3_client = boto3.client('s3')
        try:
            response = s3_client.upload_file(file_name, bucket, object_name)
        except ClientError as e:
            logging.error(e)
            return False
        return True

    def upload_file_to_userfolder(self, file_name, bucket, username, object_name=None):
        """ Upload a file to a folder in an S3 bucket

        :param file_name: File to upload
        :param bucket: Bucket to upload to
        :param username: The user's folder stored in S3 bucket. If not exist, automatically create one
        :param object_name: S3 object name. If not specified then same as file_name
        :return: True if file was uploaded, else False
        """

        if object_name:
            file_full_name = username + '/' + object_name
        else:
            file_full_name = username + '/' + file_name
        return self.upload_file(file_name, bucket, file_full_name)


    def delete_object(self, bucket_name, object_name, folder_name=None):
        """Delete an object from an S3 bucket

        :param bucket_name: string
        :param object_name: string
        :param folder_name: S3 folder's name. If not specified delete S3 object directly
        :return: True if the referenced object was deleted or object file don't exist, otherwise False
        """
        if folder_name:
            object_name = folder_name + '/' + object_name
        # Delete the object
        s3 = boto3.client('s3')
        try:
            s3.delete_object(Bucket=bucket_name, Key=object_name)
        except ClientError as e:
            logging.error(e)
            return False
        return True

    def delete_objects(self, bucket_name, object_names, folder_name=None):
        """Delete multiple objects from an Amazon S3 bucket

        :param bucket_name: string
        :param object_names: list of strings
        :param folder_name: S3 folder's name. If not specified delete S3 objects directly
        :return: True if the referenced objects were deleted or object files don't exist, otherwise False
        """
        if folder_name:
            object_names = [folder_name + '/' + object_name for object_name in object_names]
        # Convert list of object names to appropriate data format
        objlist = [{'Key': obj} for obj in object_names]

        # Delete the objects
        s3 = boto3.client('s3')
        try:
            s3.delete_objects(Bucket=bucket_name, Delete={'Objects': objlist})
        except ClientError as e:
            logging.error(e)
            return False
        return True

