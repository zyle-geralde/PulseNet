from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() #get all Users
    serializer_class = UserSerializer #call the serializer to identify which fields to use
    permission_classes = [AllowAny] #allow anyone to access since even if they are not authenticated
