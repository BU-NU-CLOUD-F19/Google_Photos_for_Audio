from django import forms
from .models import CustomUser
from django.core.exceptions import ValidationError


class UserRegisterForm(forms.Form):
    name = forms.CharField()
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = CustomUser
        fields = ['name', 'email', 'password']

    def clean_email(self):
        email = self.cleaned_data['email'].lower()
        filter_result = CustomUser.objects.filter(email=email)
        if filter_result.count():
            raise  ValidationError("Email already exists.")
        print("Email cleaned.")
        return email

    def save(self, commit=True):
        user = CustomUser.objects.create_user(
            username=self.cleaned_data['email'],
            email=self.cleaned_data['email'],
            password=self.cleaned_data['password'],
            name=self.cleaned_data['name'],
        )
        print("User stored in DB.")
        return user

class UserLoginForm(forms.Form):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = CustomUser
        fields = ['name', 'email', 'password']


class CustomUserChangeForm(forms.Form):
    class Meta:
        model = CustomUser
        fields = ['name', 'email', 'password']
