from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed

#serialize data to pass from backend to frontend and vice versa

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]  # Ensure unique emails
    )
    class Meta:
        model = User# model that you want to serialize
        fields = ["id","email","password"] # fields that you want to serialize
        extra_kwargs = {"password":{"write_only":True}} #accept password when creating a user but it will not be returned when giving information to the user.

    def create(self,validated_data):
        #user = User.objects.create_user(**validated_data)
        email = validated_data['email']
        password = validated_data.pop('password')
        user = User(username=email, email=email)  # Set email as username
        user.set_password(password)  # Hash the password
        user.save()

        return user
    


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Use email to fetch the user instead of username
        email = attrs.get("username")
        password = attrs.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("No user with this email found.")

        # Check if the password is correct
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password.")

        # Proceed with the normal token creation if valid
        return super().validate({
            "username": user.username,  # Token still requires username internally
            "password": password,
        })

