from django.shortcuts import render
from properties import *

def new_property(request):
	return render(request,  'properties/new_property.html')

def property(request, property_id):
	return render(request,  'properties/property.html')

def new_unit(request, property_id):
	return render(request,  'properties/new_unit.html')

def unit(request, property_id, unit_id):
	return render(request,  'properties/units.html')
