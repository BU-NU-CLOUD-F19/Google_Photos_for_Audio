from django.urls import path
from .views import LoginView


urlpatterns = [
    path('signIn', LoginView.as_view())
]
