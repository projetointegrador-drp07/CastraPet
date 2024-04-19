from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from cadastro.models import Usuario, Animais
import json
from django.core import serializers
from .models import Agendamentos, Animais_agendados
from datetime import datetime
from django.db.models import F

# Create your views here.
@login_required
def agendamentos(request):
    if request.method == "GET":
        #pesquisa todos os usuarios cadastrados
        lista_usuarios =  {
            'lista_usuarios':Usuario.objects.all(),
        }

        return render(request, 'agendamentos.html', lista_usuarios)
    
@login_required
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
        
@login_required
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

@login_required
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

@login_required
def exibe_agendamentos(request):
    if request.method == "POST":
        dados = request.POST.get('pesquisa_nome')
        #print(dados)
        if dados:
            #pesquisa = Agendamentos.objects.filter(cod_usuario__nome__icontains=dados)
            pesquisa = Usuario.objects.filter(nome__icontains=dados, agendamentos__data_agendamento__isnull=False).annotate(data_agendamento=F('agendamentos__data_agendamento'), id_agendamento=F('agendamentos__id')).order_by('-data_agendamento')
            dados = [
                {
                    'id_agendamento': usuario.id_agendamento,
                    'id_usuario': usuario.id,
                    'nome': usuario.nome,
                    'cpf': usuario.cpf,
                    'data_agendamento': usuario.data_agendamento.strftime('%d-%m-%Y'),
                    #'id_animal': json.dumps(list(Animais_agendados.objects.filter(cod_agendamento_id=usuario.id_agendamento).values_list('cod_animal_id', flat=True))),
                    #'nomes_animais':json.dumps(list(Animais.objects.filter(id__in=Animais_agendados.objects.filter(cod_agendamento_id=usuario.id_agendamento).values_list('cod_animal_id', flat=True)).values_list('nome_animal', flat=True))),
                    
                }   
                for usuario in pesquisa
            ]
            print(dados)
            context = {
                'dados':dados,
                }
           
            return JsonResponse(context)
        else:
            pesquisa = Usuario.objects.filter(agendamentos__data_agendamento__isnull=False).annotate(data_agendamento=F('agendamentos__data_agendamento'), id_agendamento=F('agendamentos__id')).order_by('-data_agendamento')

            dados = [
                {
                    'id_agendamento': usuario.id_agendamento,
                    'id_usuario': usuario.id,
                    'nome': usuario.nome,
                    'cpf': usuario.cpf,
                    'data_agendamento': usuario.data_agendamento.strftime('%d-%m-%Y'),
                    #'id_animal': json.dumps(list(Animais_agendados.objects.filter(cod_agendamento_id=usuario.id_agendamento).values_list('cod_animal_id', flat=True))),
                    #'nomes_animais':json.dumps(str(list(Animais.objects.filter(id__in=Animais_agendados.objects.filter(cod_agendamento_id=usuario.id_agendamento).values_list('cod_animal_id', flat=True)).values_list('nome_animal', flat=True)))),
                }   
                for usuario in pesquisa
            ]
            print(dados)
            context = {
                'dados':dados,
                }
            return JsonResponse(context)
        
@login_required
def exibe_animais(request, id):
    id_animais = Animais_agendados.objects.filter(cod_agendamento_id=id).values_list('cod_animal_id', flat=True)
    ids=[{ 'ids': a }for a in id_animais]
    nomes_animais = Animais.objects.filter(id__in=Animais_agendados.objects.filter(cod_agendamento_id=id).values_list('cod_animal_id', flat=True)).values_list('nome_animal', flat=True)
    nomes =[{ 'nomes': n }for n in nomes_animais]    
    
    context = {
        'ids': ids,
        'nomes':nomes,
    }
    return JsonResponse(context)

@login_required
def exclui_agendamentos(request, id):
    print(id)
    return HttpResponse('teste')

