# llord.urls

from django.conf.urls import patterns, include, url
from llord_core_app import views

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'llord.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # For built-in django admin site:
    # url(r'^admin/', include(admin.site.urls)),

    # Base site urls routed to llord_core_app:
    url(r'^$', include('llord_core_app.urls', namespace='llord', app_name='llord_core_app')),

    # Account app masks sosme of the allauth functionality
    #  remainder gets handled under /accounts/
    url(r'^account/', include('account.urls', namespace='account')),

    # Required for allauth, even though we're not using these urls
    url(r'^accounts/', include('allauth.urls')),

    url(r'^document/', include('document.urls', namespace='document')),
    #url(r'^document/', views.document_viewer, name='document_viewer'),

    url(r'^properties/', include('properties.urls', namespace='properties')),


    # need a better way of dealing with this case 
    #  ex. /accounts/ is unhandled
    #  so the below just presents the index view but doesn't change the displayed url
    #url(r'^accounts/$', include('llord_core_app.urls', namespace='llord')),
)
