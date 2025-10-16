# myproject-backend/backend/urls.py
from django.urls import path, re_path, include
from django.contrib import admin
from django.views.generic import TemplateView, RedirectView
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('ai.urls')),
    path('favicon.ico', RedirectView.as_view(url='/static/vite.svg')),
    # Serve images explicitly
    path('Logo.png/', serve, {'document_root': settings.STATICFILES_DIRS[0], 'path': 'Logo.png'}),
    path('K.png/', serve, {'document_root': settings.STATICFILES_DIRS[0], 'path': 'K.png'}),
    path('A.png/', serve, {'document_root': settings.STATICFILES_DIRS[0], 'path': 'A.png'}),
    path('B.png/', serve, {'document_root': settings.STATICFILES_DIRS[0], 'path': 'B.png'}),
    # Catch-all for SPA
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='index'),
]