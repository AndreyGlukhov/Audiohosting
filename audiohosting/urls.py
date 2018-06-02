"""audiohosting URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.conf import settings
from . import views


urlpatterns = [
    url(r'^$', views.main_redirect, name='main_redirect'),
    url(r'^records/', include(('records.urls', 'records'), namespace='records')),
    url(r'^account/', include(('accounts.urls', 'accounts'), namespace='accounts')),
    url(r'^home/', include(('home.urls', 'home'), namespace='home')),
    url(r'^api/', include(('api.urls', 'api'), namespace='api')),
    url(r'^main/', include(('main.urls', 'main'), namespace='main')),
    url(r'admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
