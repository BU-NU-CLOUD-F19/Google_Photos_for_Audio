from django.db import models


class CustomFile(models.Model):
    '''
    Custom user management model.
    '''

    filename = models.CharField(max_length=100)

