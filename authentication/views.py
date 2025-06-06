from django.shortcuts import render
from django.views.generic import TemplateView

class LoginView(TemplateView):
    template_name = 'authentication/login.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

class AdminSignInView(TemplateView):
    template_name = 'authentication/login.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user_type'] = 'admin'
        return context

class StudentSignInView(TemplateView):
    template_name = 'authentication/login.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user_type'] = 'student'
        return context

class AdminSignUpView(TemplateView):
    template_name = 'authentication/signup.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user_type'] = 'admin'
        return context

class StudentSignUpView(TemplateView):
    template_name = 'authentication/signup.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user_type'] = 'student'
        return context
