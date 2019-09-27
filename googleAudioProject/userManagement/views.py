from django.shortcuts import render, redirect, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import login, logout
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.views.generic.edit import FormView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import mixins, generics
from .serializers import UserSerializer
from .models import CustomUser
from .forms import UserRegisterForm, UserLoginForm


# class HomeView():
#     pass
#     #
#     # def get(self, request):
#     #     content = {}
#     #     if request.user.is_authenticated:
#     #         print()

class LoginView(mixins.CreateModelMixin,
                mixins.RetrieveModelMixin,
                mixins.UpdateModelMixin,
                mixins.DestroyModelMixin,
                generics.GenericAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

# class RegisterView(FormView):
#
#     def get(self, request):
#         content = {}
#         content['form'] = UserRegisterForm
#         return render(request, 'register.html', content) # change to fit actual register page name
#
#     def post(self, request):
#         content = {}
#         userForm = UserRegisterForm(request.POST, request.FILES or None)
#         if userForm.is_valid():
#             user = userForm.save(commit=False)
#             user.password = make_password(form.cleaned_data['password'])
#             user.save()
#             login(request, user)
#             return redirect(reverse('home-view'))
#         content['form'] = userForm
#         template = 'register.html' # change to fit actual register page name
#         return render(request, template, content)
#
# class LoginView(FormView):
#
#     content = {}
#     content['form'] = UserLoginForm
#
#     @method_decorator(csrf_exempt)
#     def dispatch(self, request, *args, **kwargs):
#         return super(LoginView, self).dispatch(request, *args, **kwargs)
#
#     def get(self, request):
#         content = {}
#         if request.user.is_authenticated:
#             return redirect(reverse('home-view'))
#         content['form'] = UserLoginForm
#         return render(request, 'login.html', content)
#
#     def post(self, request):
#         content = {}
#         email = request.POST['email']
#         password = request.POST['password']
#         try:
#             users = User.objects.filter(email=email)
#             user = authenticate(request, username=users.first().username, password=password)
#             login(request, user)
#             return redirect(reverse('dashboard-view'))
#         except Exception as e:
#             content = {}
#             content['form'] = UserLoginForm
#             content['error'] = 'Unable to login with provided credentials' + e
#             return render_to_response('login.html', content)
