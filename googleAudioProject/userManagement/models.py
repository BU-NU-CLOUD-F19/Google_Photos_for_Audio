from django.db import models


# Create your models here.
class UserManagement(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.TextField()
