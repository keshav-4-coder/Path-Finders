from django.urls import path
from . import views

urlpatterns = [
    path('api/user/', views.user_data, name='user_data'),
    path('chat/api/chat/', views.chat_api, name='chat_api'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('signout/', views.signout, name='signout'),
    # Other URLs...
]