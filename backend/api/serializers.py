from django.contrib.auth.models import User
from rest_framework import serializers

#serialize data to pass from backend to frontend and vice versa

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User# model that you want to serialize
        fields = ["id","username","password"] # fields that you want to serialize

