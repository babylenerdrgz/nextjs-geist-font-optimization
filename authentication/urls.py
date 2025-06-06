from django.urls import path
from . import views

app_name = 'authentication'

urlpatterns = [
    path('', views.LoginView.as_view(), name='login'),
    path('administrator/signin/', views.AdminSignInView.as_view(), name='admin_signin'),
    path('administrator/signup/', views.AdminSignUpView.as_view(), name='admin_signup'),
    path('student/signin/', views.StudentSignInView.as_view(), name='student_signin'),
    path('student/signup/', views.StudentSignUpView.as_view(), name='student_signup'),
]
