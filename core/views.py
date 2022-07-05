from tracemalloc import start
from django.shortcuts import render

from datetime import datetime 

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.db.models import Q

from django.contrib.auth.hashers import make_password

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .serializers import UserSerializer, FollowSerializer, ToggleSerializer, TimeSerializer, UserSerializerWithToken, SimpleUserSerializer
from .models import User, Toggle, Time
from .models import Follow
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
    def post(self, request):
        data = request.data

        id = data["id"]
        username = data["username"]
        avatar = data["avatar"]
        first_name = data["firstName"]
        last_name = data["lastName"]
        password = data["password"]
        is_private = data["is_private"]

        user = ""

        if id:
            user = User.objects.get(id = id)

            if not username:
                pass
            elif username != user.username:
                user.username = username

            if avatar:    
                user.avatar = avatar

            if not first_name:
                pass
            elif first_name != user.first_name:
                user.first_name = first_name

            if not last_name:
                pass
            elif last_name != user.last_name:
                user.last_name = last_name

            if not password:
                pass
            elif make_password(password) != user.password:
                user.password = make_password(password)

           
            user.is_private = is_private

            user.save()

        user = User.objects.get(id = id)

        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data)


            

class SignUp(APIView):
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

class ToggleView(APIView):
    def get(self, request):
        user = request.user

        if Toggle.objects.filter(user_id_id=user.id).exists():
            toggle = Toggle.objects.filter(user_id_id=user.id).latest("toggled_time")

            serializer = ToggleSerializer(toggle, many=False)

            return Response(serializer.data)
        else:
            return Response(None)

    @method_decorator(csrf_exempt)
    def post(self, request):
        data = request.data
        msg = ""

        serializer = ""

        try:
            toggle = Toggle.objects.create(
                is_toggled = data["is_toggled"],
                user_id_id = data["user_id"],
            )

            serializer = ToggleSerializer(toggle, many=False)
            
        except:
            msg = "something goes wrong!"
            return Response(msg, status=status.HTTP_400_BAD_REQUEST)

        if Toggle.objects.filter(user_id_id=data["user_id"]).exists():
            toggle_ordered_by_date = Toggle.objects.filter(user_id_id=data["user_id"]).order_by('-toggled_time')
            
            if len(toggle_ordered_by_date) > 1:
                interval_in_seconds = round((toggle_ordered_by_date[0].toggled_time - toggle_ordered_by_date[1].toggled_time).total_seconds())

                try:
                    time = Time.objects.create(
                        user_id_id = data["user_id"],
                        toggle_status = toggle_ordered_by_date[1].is_toggled,
                        interval = interval_in_seconds,
                    )

                    time_serializer = TimeSerializer(time, many=False)

                except:
                    msg = "something goes wrong!"
                    return Response(msg, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.data)

class Stats(APIView):
    def get(self, request):
        user = request.user

        filtered_time = Time.objects.filter(user_id_id=user.id).all()

        serializer = TimeSerializer(filtered_time, many=True)

        return Response(serializer.data)

class People(APIView):
    def post(self, request):
        user_list = []

        data = request.data

        users = ""
        id = request.user.id

        start_with = data["startWith"]

        if start_with == "":
            return Response([])

        else:
        
            if " " in start_with:
                start_with = start_with.split(" ")

                q1 = Q(first_name__startswith = start_with[0])
                q2 = Q(last_name__startswith = start_with[1])

                users = User.objects.filter(q1 & q2)

            else:
                q1 = Q(first_name__startswith = start_with)
                q2 = Q(username__startswith = start_with)
                q3 = Q(last_name__startswith = start_with)

                users = User.objects.filter(q1 | q2 | q3)


            for user in users:
                mood = ""
                if Toggle.objects.filter(user_id_id = user.id):
                    toggle = Toggle.objects.filter(user_id_id = user.id).latest("toggled_time")

                    mood = toggle.is_toggled

                serializer = SimpleUserSerializer(user, many=False)

                if(user.is_private == 1):
                    mood = "Private"
                user_list.append([serializer.data, mood])

            return Response(user_list)
        
class FollowView(APIView):
    def get(self, request):
        user = request.user

        if Follow.objects.filter(user = user).exists():
            user_followers = ""

            user_followings = Follow.objects.filter(user = user).all()


            if Follow.objects.filter(followed_user = user).exists():
                user_followers = Follow.objects.filter(followed_user = user).exists()

            following_serializer = FollowSerializer(user_followings, many=True)
            follower_serializer = FollowSerializer(user_followers, many=True)

            return Response([following_serializer.data, follower_serializer.data])

        else:
            msg = "No Following Data!"
            return Response(msg, status=status.HTTP_400_BAD_REQUEST)


    def post(self, request):
        data = request.data

        followed_by = data["followed_by"]
        followed = data["followed"]
        action = data["action"]

        user = User.objects.get(id = followed_by)
        followed_user = User.objects.get(id = followed)


        stat = ""

        if followed_user.is_private:
            stat = "pending"
        else:
            stat = "accepted"

        if action == "Follow":
            try:
                new_follow= Follow.objects.create(
                user= user,
                followed_user = followed_user,
                status = stat,
                )

                follow_serializer = FollowSerializer(new_follow, many=False)

                return Response(follow_serializer.data)
            
            except:
                msg = "something goes wrong!"
                return Response(msg, status=status.HTTP_400_BAD_REQUEST)

        else:
            try:
                instance = Follow.objects.filter(user = followed_by).get(followed_user = followed)
                instance.delete()
                msg = "Unfollowed!"
                return Response(msg)

            except:
                msg = "something goes wrong!"
                return Response(msg, status=status.HTTP_400_BAD_REQUEST)
