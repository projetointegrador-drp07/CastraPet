from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from cadastro.models import Usuario, Animais
import json
from django.core import serializers
from .models import Agendamentos, Animais_agendados
from datetime import datetime


# Create your views here.

def agendamentos(request):
    if request.method == "GET":
        #pesquisa todos os usuarios cadastrados
        lista_usuarios =  {'lista_usuarios':Usuario.objects.all()}

        return render(request, 'agendamentos.html', lista_usuarios)
    

def seleciona_dados(request):
    if request.method == "POST":
        dados = request.POST.get('pesquisa_nome')
        tipo = request.POST.get('tipo')
        #print(tipo)
        if dados:
            if tipo == "1":
                data= Usuario.objects.filter(nome__icontains=dados)
                data1 = json.loads(serializers.serialize('json',data))
                data1 = [{'fields': i['fields'], 'id': i['pk']} for i in data1]
                context = {'dados':data1}
                #print(context)
                return JsonResponse(context)
            if tipo == "2":
                data= Usuario.objects.filter(cpf__icontains=dados)
                data1 = json.loads(serializers.serialize('json',data))
                data1 = [{'fields': i['fields'], 'id': i['pk']} for i in data1]
                context = {'dados':data1}
                #print(context)
                return JsonResponse(context)
            if tipo == "3":
                data= Usuario.objects.filter(telefone1__icontains=dados)
                data1 = json.loads(serializers.serialize('json',data))
                data1 = [{'fields': i['fields'], 'id': i['pk']} for i in data1]
                context = {'dados':data1}
                #print(context)
                return JsonResponse(context)
            if tipo == "4":
                data= Usuario.objects.filter(email__icontains=dados)
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


def grava_agendamentos(request):
    if request.method == "POST":
        id = request.POST.get('usuario_agendamento')
        data_agendamento = request.POST.get('data_agendamento')
        animais = request.POST.getlist('animais[]')

        
        print(id)
        print(data_agendamento)

        usu =  Usuario.objects.get(id = id)
        data_formatada = datetime.strptime(data_agendamento, '%d/%m/%Y').date()
        print(data_formatada)

        agd = Agendamentos(
            data_agendamento = data_formatada,
            cod_usuario = usu
        )
        agd.save()

        for animais in animais:
            print(animais)
            print(type(animais))
            cod_animal = Animais.objects.get(id = int(animais))
            anm = Animais_agendados(
                cod_agendamento = agd,
                cod_animal = cod_animal
            )
            anm.save()
            animal = Animais.objects.get(id = animais)
            animal.castr = 1
            animal.save()


    return HttpResponse("Cadastrado com sucesso")