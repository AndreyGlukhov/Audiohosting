from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^record/(?P<slug>.+)/$', views.API_Record.as_view(), name='api_record'),
]