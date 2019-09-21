from rest_framework import serializers
from userManagement.models import UserManagement


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserManagement
        fields = ('id', 'name', 'email', 'password')
