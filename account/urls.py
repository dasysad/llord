# account.urls

from django.conf.urls import patterns, include, url
#from account import views
from allauth.urls import url

urlpatterns = patterns('',
	# ex: /
	#url(r'^$', views.index, name='index'),

	# Masks the default allauth url /accounts/ 
	#	by routing specific /account/ urls to allauth views
	url(r'^logout', 'django.contrib.auth.views.logout', {'next_page': '/'}, name='logout'),
	url(r'^login', 'allauth.account.views.login', name='login'),
	url(r'^signup', 'allauth.account.views.signup', name='signup'),
	
	# /account/ urls not captured above are routed to allauth url handler
	url(r'', include('allauth.urls')),

)
