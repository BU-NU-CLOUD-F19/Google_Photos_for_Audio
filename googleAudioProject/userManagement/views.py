from django.shortcuts import render, redirect, HttpResponseRedirect
from django.contrib.auth import login, logout, authenticate
from django.utils.decorators import method_decorator
from .serializers import UserSerializer
from .forms import UserRegisterForm
from .models import CustomUser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics

class UserRegister(generics.CreateAPIView):
    serializer_class = UserSerializer

    @api_view(["POST"])
    def create_user(request):
        form = UserRegisterForm(request.data)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()
            user.save()
            raw_password = form.cleaned_data.get('password')
            user = authenticate(username=user.username, password=raw_password)
            login(request, user)
            return Response({"message": "User created."})
        else:
            data = {
              "error": True,
              "errors": serializer.errors,
            }
            return Response(data)

# class UserLogin(generics.RetrieveAPIView):
#     serializer_class = UserSerializer
#
#     @api_view(["GET"])
#     def user_details(request):
#         form = UserRegisterForm(request.data)
#         if form.is_valid():
#             user = form.save()
#             user.refresh_from_db()
#             user.save()
#             raw_password = form.cleaned_data.get('password')
#             user = authenticate(username=user.username, password=raw_password)
#             login(request, user)
#             user = CustomUser.objects.get(id=pk)
#             serializer = UserSerializer(user)
#             return Response(serializer.data)
#         else:
#             data = {
#               "error": True,
#               "errors": serializer.errors,
#             }
#             return Response(data)

class UserDetails(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    @api_view(["GET"])
    def user_details(request, pk):
        user = CustomUser.objects.get(id=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class UserUpdate(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    @api_view(["GET", "PUT"])
    def user_update(request, pk):
        user = CustomUser.objects.get(id=pk)
        if request.method == "PUT":
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response({"error": serializer.errors, "error": True})
        serializer = UserSerializer(user)
        return Response(serializer.data)

class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    @api_view(["GET"])
    def users_list(request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
