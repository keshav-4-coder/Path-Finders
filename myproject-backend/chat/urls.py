# chat/urls.py
from django.urls import path
from .views import chatbot_api, clear_chat

urlpatterns = [
    path('api/chat/', chatbot_api, name='chatbot_api'),
    path('api/clear-chat/', clear_chat, name='clear_chat'),
]