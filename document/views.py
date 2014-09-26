from django.shortcuts import render
from document import *

def document_viewer(request):
	return render(request,  'document/document_viewer.html')
