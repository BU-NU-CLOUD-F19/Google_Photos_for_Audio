from rest_framework import serializers
from .models import CustomFile


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomFile
        fields = ('filename',)
