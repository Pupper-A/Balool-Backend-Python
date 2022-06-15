from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .serializers import UserSerializer, FollowSerializer, ToggleSerializer, TimeSerializer
from .models import User, Follow, Toggle, Time

class SignUp(APIView):
    def get(self, request):
        username = "roozbeh"
        return Response(username)
        
    @method_decorator(csrf_exempt)
    def post(self, request):
        print(request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def front(request):
    context = { }
    return render(request, "index.html", context)
