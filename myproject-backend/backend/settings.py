from pathlib import Path
import os
from datetime import timedelta

# At the END of your settings.py file, add:

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Claude API Key
ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')

# Debug: Check if key is loaded
if not ANTHROPIC_API_KEY:
    print("⚠️  WARNING: ANTHROPIC_API_KEY not found!")
    print("Make sure you have ANTHROPIC_API_KEY in your .env file")
else:
    print("✅ ANTHROPIC_API_KEY loaded successfully")


# Build paths
BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = os.path.join(BASE_DIR, '..', 'myproject-frontend', 'dist')  # Path to frontend build (e.g., Vite dist folder)

# Security settings
SECRET_KEY = 'django-insecure-7x^jr#cqfwx(294vl@#jgbl*kys@c*y3-p6rt1z4%o)va6g+jg'  # Replace with secure key in production (e.g., generate with secrets.token_urlsafe(50))
DEBUG = True  # Set to False in production
ALLOWED_HOSTS = ['*']  # Restrict to specific domains in production (e.g., ['localhost', 'yourdomain.com'])

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'ai',
    'chat',  # Custom app
    'rest_framework',  # Django REST Framework for API
    'corsheaders',  # CORS support for frontend-backend communication
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Handle CORS headers
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [FRONTEND_DIR],  # Serve index.html from frontend dist for SPA
        'APP_DIRS': True,  # Look for templates in app directories (e.g., ai/templates)
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',  # SQLite database file
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = '/static/'  # URL prefix for static files; must match Vite's base in vite.config.js
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # Where collectstatic copies files
STATICFILES_DIRS = [FRONTEND_DIR]  # Source of static files; run `collectstatic` after frontend build

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# JWT settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}

# CORS settings
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # Frontend dev server (e.g., Vite)
    'http://127.0.0.1:3000',
    'http://localhost:8000',  # Django server; remove if frontend runs separately
]