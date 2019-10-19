from django.shortcuts import render, redirect, HttpResponseRedirect
from django.contrib.auth import login, logout, authenticate
from django.utils.decorators import method_decorator
from .serializers import UserSerializer
from .models import CustomUser
from .forms import UserRegisterForm, UserLoginForm
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics


class UserRegister(generics.CreateAPIView):
    serializer_class = UserSerializer

    messages = {
        'auth_success': 'User created.',
        'auth_fail': 'User not created.',
    }

    def post(self, request, *args, **kwargs):
        email = request.data['email']
        password = request.data['password']
        form = UserRegisterForm(request.data)
        if form.is_valid():
            print(form.cleaned_data)
            user = form.save()
            user_auth = authenticate(username=form.cleaned_data['email'],
                                password=form.cleaned_data['password'])
            print(user)
            return Response(data=self.messages['auth_success'], status=200)
        # else:
        #     print("registration error")
        return Response(data=form.errors)
            # try:
                # user = authenticate(request, username=email, password=password)
                # print("User created.")
                # return self.create(request, *args, **kwargs)
            # except:
            #     print("User not created.")
            #     return Response(data=self.messages['auth_fail'], status=400)

class UserLogin(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    messages = {
        'success': "User successfully logged in.",
        'invalid': "Authentication failed.",
    }

    def post(self, request, *args, **kwargs):
        email = request.data['email']
        password = request.data['password']
        # print(email)
        # print(password)
        print(request.data)
        user = authenticate(request, username=email, password=password)
        print(user)
        if user is not None:
            login(request, user)
            return Response(data=self.messages['success'], status=200)
        else:
            return Response(data=self.messages['invalid'], status=400)

class UserLogout():
    pass

class UserDetails(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    lookup_field="email"

    @api_view(["GET"])
    def user_details(request, email):
        user = CustomUser.objects.get(email=email)
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
