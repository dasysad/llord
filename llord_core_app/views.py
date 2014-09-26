from django.shortcuts import render

from django.http import HttpResponse

def index(request):
	return render(request, 'llord_core_app/index.html')
#	return HttpResponse("Ciao, il mundo.")

def user(request, username):
	response = "Your user name is: %s."
	return HttpResponse(response % username)

def property(request, property_id):
	return render(request, 'llord_core_app/property.html')
