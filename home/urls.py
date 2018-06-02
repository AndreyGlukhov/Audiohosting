from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.HomeView.as_view(), name='home'),
    url(
        r'connect/(?P<operation>.+)/(?P<pk>\d+)/$',
        views.change_friends,
        name='change_friends'
    ),
]