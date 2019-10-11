from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager


class CustomUser(AbstractBaseUser):
    '''
    Custom user management model.
    '''
    username = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.TextField()
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    objects = UserManager()

    def __str__(self):
        return self.name
