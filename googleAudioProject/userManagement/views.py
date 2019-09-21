from django.shortcuts import render
from userManagement.models import UserManagement
from userManagement.serializers import UserSerializer
from rest_framework import generics


# Create your views here.
class UserListCreate(generics.ListCreateAPIView):
    queryset = UserManagement.objects.all()
    serializer_class = UserSerializer
