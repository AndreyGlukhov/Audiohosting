from django.conf.urls import url
from . import views


urlpatterns = [
    url(
        r'^connect/(?P<operation>.+)/(?P<pk>\d+)/$',
        views.change_like_dislike,
        name='change_like_dislike'
    ),
    url(r'^$', views.RecordListView.as_view(), name='record_list'),
    url(r'^add_record/$', views.RecordCreateView.as_view(), name='add_record'),
    # url(r'^(?P<pk>[0-9]+)/$', views.RecordDetailView.as_view(), name='record_detail'),
    url(r'^(?P<slug>.+)/$', views.RecordDetailView.as_view(), name='record_detail'),

]