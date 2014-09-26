# llord_core_app.urls

from django.conf.urls import patterns, url
from llord_core_app import views

urlpatterns = patterns('',
	# ex: /
	url(r'^$', views.index, name='index'),
	# ex: /username/
	url(r'^user/(?P<username>\w+)/$', views.user, name='user'),
	# ex: /property/832NorthWoodstockStreet/
	url(r'^property/(?P<property_slug>\w+)/$', views.property, name='property'),
	
)
