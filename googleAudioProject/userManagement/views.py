from django.contrib.auth import login
from .serializers import UserSerializer
from .models import CustomUser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .UserManager import UserManager, hash_password
#from .FileManager import FileManager


class UserRegister(generics.CreateAPIView):
    serializer_class = UserSerializer

    messages = {
        'auth_success': 'User created.',
        'auth_fail': 'User not created.',
    }

    def post(self, request, *args, **kwargs):
        email = request.data['email']
        password = request.data['password']
        user = UserManager(email, hash_password(password))
        print(user.password)

        if user.new_user():
            user.add_user()
            # TODO: create a new user inf files database
            print(self.messages['auth_success'])
            return Response(data=self.messages['auth_success'], status=200)
        else:
            print('User existed! ' + self.messages['auth_fail'])
            return Response(data=self.messages['auth_fail'], status=400)


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
        user = UserManager(email, password)
        # TODO: add functions for getting user file info
        if user.new_user():
            print("Email is not registered!")
        else:
            if user.success_login():
                login(request, user)
                return Response(data=self.messages['success'], status=200)
            else:
                print("Incorrect password!")
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
