from django.db import models
import os
import uuid

def getcurrentusername(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('media/images/' + instance.username, filename)

class User(models.Model):
    first_name = models.CharField(max_length=80)
    last_name = models.CharField(max_length=80)
    username = models.CharField(max_length=80)
    email = models.CharField(max_length=80)
    password = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to=getcurrentusername, null=True)
    created_date = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.username
    
    def as_dict(self):
        return {
            "firstname": self.first_name,
            "lastname" : self.last_name,
            "username" : self.username,
            "email" : self.email,
            "created-date" : self.created_date 
        }

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