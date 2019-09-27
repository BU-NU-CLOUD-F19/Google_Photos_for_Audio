from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.hashers import make_password
from django.views.generic.edit import FormView
from .serializers import UserSerializer
from .models import CustomUser
from .forms import UserRegisterForm


class HomeView():

    def get(self, request):
        content = {}
        if request.user.is_authenticated:
            print()

class RegisterUserView(FormView):

    def get(self, request):
        content = {}
        content['form'] = UserRegisterForm
        return render(request, 'register.html', content) # change to fit actual register page name

    def post(self, request):
        content = {}
        userForm = UserRegisterForm(request.POST, request.FILES or None)
        if userForm.is_valid():
            user = userForm.save(commit=False)
            user.password = make_password(form.cleaned_data['password'])
            user.save()
            login(request, user)
            return redirect(reverse('home-view'))
        content['form'] = userForm
        template = 'register.html' # change to fit actual register page name
        return render(request, template, content)
