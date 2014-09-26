# document.urls

from django.conf.urls import patterns, include, url
from document import views

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$', 'document.views.document_viewer', name='document_viewer'),

	#url(r'^document/$', views.document_viewer, name='document_viewer'),

)