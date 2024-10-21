from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

#serialize data to pass from backend to frontend and vice versa

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]  # Ensure unique emails
    )
    class Meta:
        model = User# model that you want to serialize
        fields = ["id","email","username","password"] # fields that you want to serialize
        extra_kwargs = {"password":{"write_only":True}} #accept password when creating a user but it will not be returned when giving information to the user.

    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user

