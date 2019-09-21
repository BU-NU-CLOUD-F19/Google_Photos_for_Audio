from django.urls import path
from . import views


urlpatterns = [
    path('api/userManagement/', views.UserListCreate.as_view()),
]
