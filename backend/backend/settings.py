from pathlib import Path
from decouple import config
import os
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent


# -------------------
# Security
# -------------------

SECRET_KEY = config("SECRET_KEY")

DEBUG = config("DEBUG", default=False, cast=bool)

ALLOWED_HOSTS = [
    "*"
    # later:
    # "your-app.up.railway.app"
]


# -------------------
# Apps
# -------------------

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',

    'app',
]


# -------------------
# Middleware
# -------------------

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',

    'corsheaders.middleware.CorsMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'backend.urls'

WSGI_APPLICATION = 'backend.wsgi.application'


# -------------------
# Templates
# -------------------

TEMPLATES = [
{
'BACKEND': 'django.template.backends.django.DjangoTemplates',
'DIRS': [],
'APP_DIRS': True,
'OPTIONS': {
'context_processors': [
'django.template.context_processors.request',
'django.contrib.auth.context_processors.auth',
'django.contrib.messages.context_processors.messages',
],
},
},
]


# -------------------
# Database (Railway)
# -------------------

DATABASES = {
"default": dj_database_url.config(
default=os.environ.get("DATABASE_URL")
)
}


# -------------------
# REST Framework
# -------------------

REST_FRAMEWORK = {
'DEFAULT_AUTHENTICATION_CLASSES': (
'rest_framework_simplejwt.authentication.JWTAuthentication',
)
}


# -------------------
# CORS
# -------------------

CORS_ALLOW_ALL_ORIGINS = True

# Later use:
# CORS_ALLOWED_ORIGINS = [
#   "https://yourfrontend.vercel.app"
# ]


# -------------------
# Static Files
# -------------------

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"

STATICFILES_STORAGE = (
'whitenoise.storage.CompressedManifestStaticFilesStorage'
)


# -------------------
# Media Files
# -------------------

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"


# -------------------
# Password Validators
# -------------------

AUTH_PASSWORD_VALIDATORS = [
{
'NAME':
'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
},
{
'NAME':
'django.contrib.auth.password_validation.MinimumLengthValidator',
},
{
'NAME':
'django.contrib.auth.password_validation.CommonPasswordValidator',
},
{
'NAME':
'django.contrib.auth.password_validation.NumericPasswordValidator',
},
]


# -------------------
# Internationalization
# -------------------

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'

USE_I18N = True
USE_TZ = True


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

SECURE_SSL_REDIRECT = True

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True