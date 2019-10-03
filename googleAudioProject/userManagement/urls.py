from django.urls import re_path
from .views import UserRegister, UserDetails, UserList


urlpatterns = [
    # re_path(r'^login/$', LoginView.as_view()),
    re_path(r'^register/$', UserRegister.as_view()),
    re_path(r'^user-details/(?P<pk>\d+)/$', UserDetails.as_view()),
    re_path(r'^user-list/$', UserList.as_view()),
]
