from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from django import forms

admin.site.register(User, UserAdmin)