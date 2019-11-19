from django.urls import re_path
from .views import UserLogin, UserRegister, UserDetails, UserList
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



urlpatterns = [
    re_path(r'^login/$', UserLogin.as_view()),
    re_path(r'^register/$', UserRegister.as_view()),
    re_path(r'^obtain_token/$', TokenObtainPairView.as_view()),
    re_path(r'^refresh_token/$', TokenRefreshView.as_view()),
    re_path(r'^user-details/(?P<email>[\w.@+-]+)$', UserDetails.as_view()),
    re_path(r'^user-list/$', UserList.as_view()),
]
