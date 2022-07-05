from typing_extensions import Required
from django.db import models
import os
import uuid
from django.contrib.auth.models import AbstractUser
from datetime import datetime 

def getcurrentusername(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('images/' + instance.username, filename)

class User(AbstractUser):
    avatar = models.ImageField(upload_to=getcurrentusername, null=True)
    email = models.CharField(max_length=150, blank=False, unique=True)
    is_private = models.BooleanField(default=0)

class Follow(models.Model):
    user = models.ForeignKey("User", related_name="following", on_delete=models.CASCADE, default=1)
    followed_user = models.ForeignKey("User", related_name="followers", on_delete=models.CASCADE, default=1)
    status = models.CharField(max_length=30, default="")
    created_date = models.DateTimeField(default=datetime.now)

class Toggle(models.Model):
    user_id = models.ForeignKey("User", related_name="toggle", on_delete=models.CASCADE, default=1)
    is_toggled = models.BooleanField(null=True)
    toggled_time = models.DateTimeField(auto_now_add=True, blank=True)

class Time(models.Model):
    user_id = models.ForeignKey("User", related_name="time", on_delete=models.CASCADE, default=1)
    toggle_status = models.BooleanField()
    interval = models.IntegerField()
    date = models.DateTimeField(default=datetime.now)