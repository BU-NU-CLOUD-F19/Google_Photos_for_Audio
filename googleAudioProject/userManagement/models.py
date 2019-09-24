from django.db import models
from django.contrib.auth.models import AbstractBaseUser


class CustomUser(AbstractBaseUser):
    '''
    Custom user management model.
    '''
    name = models.CharField(max_length=100, unique=True)
    email = models.EmailField()
    password = models.TextField()

    USERNAME_FIELD = 'name'

    def __str__(self):
        return self.name
