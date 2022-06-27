from django.urls import path
from . import views

urlpatterns = [
    path("users/profile/", views.GetUserProfile.as_view(), name="user-profile"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path("users/signup/", views.SignUp.as_view(), name="sign-up"),

    path("users/toggle/", views.ToggleView.as_view(), name="toggle"),
    path("users/time/", views.Stats.as_view(), name="time")
]