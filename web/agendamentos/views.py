from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

# Create your views here.

def agendamentos(request):
    if request.method == "GET":
        return render(request, 'agendamentos.html')
