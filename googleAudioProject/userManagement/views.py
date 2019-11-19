from django.contrib.auth import login
from .serializers import UserSerializer
from .models import CustomUser
from rest_framework.response import Response
from rest_framework import generics
from .UserManager import UserManager, hash_password
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken


class UserRegister(generics.CreateAPIView):
    serializer_class = UserSerializer

    messages = {
        "auth_success": "New user created.",
        "auth_fail": "New user not created.",
    }

    def post(self, request, *args, **kwargs):
        email = request.data["email"]
        password = request.data["password"]
        user = UserManager(email, hash_password(password))
        tokens = get_tokens_for_user(user)

        # Is email valid?
        if user.check():
            # Is email new?
            if user.new_user():
                # Is password blank?
                if password == "":
                    print("Null password! " + self.messages["auth_fail"])
                    return Response(data=self.messages["auth_fail"], status=520)
                else:
                    user.add_user()
                    print(self.messages["auth_success"])
                    return Response(data=tokens, status=200)
            else:
                print("User already exists! " + self.messages["auth_fail"])
                return Response(data=self.messages["auth_fail"], status=521)
        else:
            return Response(data=self.messages["auth_fail"], status=522)


class UserLogin(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    messages = {
        "success": "User successfully logged in.",
        "invalid": "Authentication failed.",
    }

    def post(self, request, *args, **kwargs):
        email = request.data["email"]
        password = request.data["password"]
        user = UserManager(email, password)
        tokens = get_tokens_for_user(user)
        print(tokens)

        if user.new_user():
            print("Email is not registered!")
            return Response(data=self.messages["invalid"], status=523)
        else:
            if user.success_login():
                # login(request, user)
                return Response(data=tokens, status=200)
            else:
                print("Incorrect password!")
                return Response(data=self.messages["invalid"], status=524)


class UserLogout:
    pass


class UserDetails(generics.RetrieveAPIView):
    pass


class UserUpdate(generics.RetrieveUpdateAPIView):
    pass


class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
