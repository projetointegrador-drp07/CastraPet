from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from cadastro.models import Usuario, Animais
import json
from django.core import serializers

# Create your views here.

def agendamentos(request):
    if request.method == "GET":
        #pesquisa todos os usuarios cadastrados
        lista_usuarios =  {'lista_usuarios':Usuario.objects.all()}

        return render(request, 'agendamentos.html', lista_usuarios)
    

def seleciona_dados(request):
    if request.method == "POST":
        dados = request.POST.get('pesquisa_nome')
        #print(dados)
        if dados:
            data= Usuario.objects.filter(nome__icontains=dados)
            data1 = json.loads(serializers.serialize('json',data))
            data1 = [{'fields': i['fields'], 'id': i['pk']} for i in data1]
            context = {'dados':data1}
            #print(context)
            return JsonResponse(context)
        else:
            data= Usuario.objects.all()
            data1 = json.loads(serializers.serialize('json',data))
            data1 = [{'fields': i['fields'], 'id': i['pk']} for i in data1]
            context = {'dados':data1}
            #print(context)
            return JsonResponse(context)
        

def seleciona_animais(request):
    if request.method == "POST":
        id = request.POST.get('pesquisa_animal')
        print(id)
        if id:

            data= Animais.objects.filter(usuario_id__exact=id)
            data1 = json.loads(serializers.serialize('json',data))
            data1 = [{'fields': i['fields'], 'id': i['pk']} for i in data1]
            context = {'animais':data1}
            #print(context)
            return JsonResponse(context)
