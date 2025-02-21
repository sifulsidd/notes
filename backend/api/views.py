from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class CreateUserView(generics.CreateAPIView):
    # list of different objects when create new one, make sure don't create user that exists
    queryset = User.objects.all()
    # what kind of data we need for a new user
    serializer_class = User
    # who can call this data, think registration
    permission_classes = [AllowAny]
    
    