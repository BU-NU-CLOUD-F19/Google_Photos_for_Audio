from django.db import models

# Create your models here.

class User(models.Model):
    student_id = models.IntegerField()
    name = models.CharField(max_length=20)
    age = models.IntegerField()

class StudentSorce(models.Model):
    student_id = models.IntegerField()
    math = models.FloatField()
    english = models.FloatField()
    chiness = models.FloatField()
