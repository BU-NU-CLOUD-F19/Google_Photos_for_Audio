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
import configparser

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

    def delete_object(self, bucket_name, object_name):
        """Delete an object from an S3 bucket

        :param bucket_name: string
        :param object_name: string
        :return: True if the referenced object was deleted, otherwise False
        """

        # Delete the object
        s3 = boto3.client('s3')
        try:
            s3.delete_object(Bucket=bucket_name, Key=object_name)
        except ClientError as e:
            logging.error(e)
            return False
        return True

    def delete_objects(self, bucket_name, object_names):
        """Delete multiple objects from an Amazon S3 bucket

        :param bucket_name: string
        :param object_names: list of strings
        :return: True if the referenced objects were deleted, otherwise False
        """

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

