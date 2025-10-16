from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    name = request.data.get('name')
    if not username or not password or not name:
        return Response({"error": "Username, password, and name are required"}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)
    try:
        user = User.objects.create_user(username=username, password=password, first_name=name)
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "User created",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "name": user.first_name  # Return name
        }, status=201)
    except Exception as e:
        return Response({"error": "Server error occurred"}, status=500)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response({"error": "Invalid credentials"}, status=400)
    try:
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "name": user.first_name  # Return name
        }, status=200)
    except Exception as e:
        return Response({"error": "Server error occurred"}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def signout(request):
    refresh_token = request.data.get('refresh_token')
    if refresh_token is None:
        return Response({"error": "Refresh token is required"}, status=400)
    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Successfully signed out"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@csrf_exempt
@login_required
def user_data(request):
    if request.method == "GET":
        user = request.user
        return JsonResponse({
            "name": user.first_name or user.username,  # Use first_name
            "interests": getattr(user, "interests", "general"),
        })
    return JsonResponse({"error": "Invalid method"}, status=405)

@csrf_exempt
def chat_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        message = data.get("message")
        user_profile = data.get("userProfile", {})
        response = {
            "success": True,
            "response": f"Received: {message}",
            "userProfile": user_profile,  # Return input userProfile
        }
        return JsonResponse(response)
    return JsonResponse({"success": False, "error": "Invalid method"})