from django.shortcuts import render
from .models import UserManagement
from .serializers import UserSerializer
from rest_framework import generics


# Create your views here.
class UserListCreate(generics.ListCreateAPIView):
    queryset = UserManagement.objects.all()
    serializer_class = UserSerializer
