from typing_extensions import Required
from django.db import models
import os
import uuid
from django.contrib.auth.models import AbstractUser

def getcurrentusername(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('media/images/' + instance.username, filename)

class User(AbstractUser):
    avatar = models.ImageField(upload_to=getcurrentusername, null=True)
    email = models.CharField(max_length=150, blank=False, unique=True)

class Follow(models.Model):
    # user_id = models.ForeignKey("User", related_name="following")
    # followed_user_id = models.ForeignKey("User", related_name="followers")
    status = models.CharField(max_length=30, default="")
    created_date = models.DateTimeField(auto_now_add=True, blank=True)

    # class Meta:
    #     unique_together = ('user_id', 'followed_user_id',)

class Toggle(models.Model):
    # user_id = models.ForeignKey("User", related_name="toggle")
    is_toggled = models.BooleanField(null=True)
    toggled_time = models.DateTimeField(auto_now_add=True, blank=True)

class Time(models.Model):
    toggle_status = models.CharField(max_length=30)
    interval = models.FloatField()