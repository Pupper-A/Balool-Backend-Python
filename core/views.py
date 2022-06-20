from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .serializers import UserSerializer, FollowSerializer, ToggleSerializer, TimeSerializer, UserSerializerWithToken
from .models import User, Follow, Toggle, Time
from core import serializers


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class GetUserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)


class SignUp(APIView):
    def get(self, request):
        username = "roozbeh"
        return Response(username)
    @method_decorator(csrf_exempt)
    def post(self, request):
        data = request.data
        
        try:
            user = User.objects.create(
                first_name=data["first_name"],
                last_name=data["last_name"],
                username=data["username"],
                email=data["email"],
                avatar=data["avatar"],
                password=make_password(data["password"])
            )

            serializer = UserSerializerWithToken(user, many=False)

            return Response(serializer.data)
        except:
            msg = ""
            user = User.objects.filter(username=data["username"]).exists()

            if user:
                
                msg = {"detail": "There is a user with this username"}

            else:
                user = User.objects.filter(email=data["email"]).exists()

                if user:
                    msg = {"detail": "There is a user with this email"}

            return Response(msg, status=status.HTTP_400_BAD_REQUEST)
