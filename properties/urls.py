# properties.urls

from django.conf.urls import patterns, include, url
from properties import views

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	url(r'^new/?$', views.new_property, name='new_property'),
	url(r'^(?P<property_id>[0-9]+)/?$', views.property, name='property'),
	url(r'^(?P<property_id>[0-9]+)/unit/new/?$', views.new_unit, name='new_unit'),
	url(r'^(?P<property_id>[0-9]+)/unit/(?P<unit_id>[0-9]+)/?$', views.unit, name='unit'),
)

