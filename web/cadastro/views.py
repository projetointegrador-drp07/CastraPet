from django.shortcuts import render
from .models import Usuario, Animais
from django.shortcuts import redirect
from django.urls import reverse
from django.http import JsonResponse
import json
from django.core import serializers
from django.db.models.aggregates import Count
from datetime import datetime, date
from configuracoes.models import Valores


def cadastro(request):
    if request.method == "GET":
        #pesquisa todos os usuarios cadastrados
        lista_usuarios =  {'lista_usuarios':Usuario.objects.all()}
        txt_pesquisa = request.GET.get('pesquisa_nome')
        
        #caso tenha sido digitado algum dado no campo pesquisar faz a cosulta no banco de dados
        if txt_pesquisa:    
            lista_usuarios = {'lista_usuarios':Usuario.objects.filter(nome__icontains=txt_pesquisa)}

        #print(lista_usuarios)
        return render(request, 'cadastro.html', lista_usuarios)
    elif request.method =="POST":
        nome = request.POST.get('nome')
        cpf = request.POST.get('cpf')
        rg = request.POST.get('rg')
        email =request.POST.get('email')
        telefone1 = request.POST.get('telefone1')
        telefone2 = request.POST.get('telefone2')
        cep = request.POST.get('cep')
        endereco = request.POST.get('endereco')
        numero = request.POST.get('numero')
        bairro = request.POST.get('bairro')
        cidade = request.POST.get('cidade')
        uf = request.POST.get('uf')
        obs = request.POST.get('observacoes')
        nome_animal = request.POST.getlist('nome_animal')
        especie_animal = request.POST.getlist('especie_animal')
        idade_animal = request.POST.getlist('idade_animal')
        sexo_animal = request.POST.getlist('sexo_animal')
        cor_animal = request.POST.getlist('cor_animal')

        usuario = Usuario(
            nome = nome,
            cpf = cpf,
            rg = rg,
            email =email,
            telefone1 = telefone1,
            telefone2 = telefone2,
            cep = cep,
            endereco = endereco,
            numero = numero,
            bairro = bairro,
            cidade = cidade,
            uf = uf,
            obs = obs
        )
        usuario.save()

        for nome_animal, especie_animal, idade_animal, sexo_animal, cor_animal in zip(nome_animal, especie_animal, idade_animal, sexo_animal, cor_animal):
            animal = Animais(usuario = usuario, nome_animal = nome_animal, especie_animal = especie_animal, idade_animal = idade_animal, sexo_animal = sexo_animal, cor_animal = cor_animal)
            animal.save()


        dados = {
            'id':usuario.id,
            'nome': nome,
            'cpf' : cpf,
            'rg': rg,
            'endereco' : endereco,
            'numero': numero,
            'cidade' : cidade,
            'telefone1' : telefone1,
            'telefone2' : telefone2,
            'email': email,
            'animais': Animais.objects.filter(usuario=usuario.id)
        }
        lista_usuarios =  {'lista_usuarios':Usuario.objects.all()}
        #return render(request,'termo.html', dados)
        return render(request, 'cadastro.html', lista_usuarios)
    
def apagar_usuario(request, id):
    try:
        usuario = Usuario.objects.get(id=id)
        usuario.delete()
        print('apagado com sucesso')
        return redirect(reverse('cadastro'))
    except:
        return redirect(reverse('cadastro'))

def termo(request, id):
    usuario = Usuario.objects.get(id=id)
    dados = {
        'id':usuario.id,
        'nome': usuario.nome,
        'cpf' : usuario.cpf,
        'rg': usuario.rg,
        'endereco' : usuario.endereco,
        'numero': usuario.numero,
        'cidade' : usuario.cidade,
        'telefone1' : usuario.telefone1,
        'telefone2' : usuario.telefone2,
        'email': usuario.email,
        'animais': Animais.objects.filter(usuario=usuario.id)
        }
    return render(request,'termo.html', dados)

def exibe_dados(request):
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
        
def edita_dados(request):
    if request.method == "POST":
        id_user = request.POST.get('id')
        #print(id_user)
        if id_user:
            data= Usuario.objects.filter(id__iexact=id_user)
            data1 = json.loads(serializers.serialize('json',data))
            data1 = [{'fields': i['fields'], 'id': i['pk']} for i in data1]
            animais = Animais.objects.filter(usuario = id_user)
            animais1 = json.loads(serializers.serialize('json',animais))
            animais1 = [{'fields': i['fields'], 'id': i['pk']} for i in animais1]
            context = {'dados':data1, 'animais': animais1}
            #print(context)
            return JsonResponse(context)
    
def att_usuario(request):
    if request.method == "POST":
        id1 = request.POST.get('id')
        nome = request.POST.get('nome')
        cpf = request.POST.get('cpf')
        rg = request.POST.get('rg')
        email =request.POST.get('email')
        telefone1 = request.POST.get('telefone1')
        telefone2 = request.POST.get('telefone2')
        cep = request.POST.get('cep')
        endereco = request.POST.get('endereco')
        numero = request.POST.get('numero')
        bairro = request.POST.get('bairro')
        cidade = request.POST.get('cidade')
        uf = request.POST.get('uf')
        obs = request.POST.get('observacoes')
        id_animal = request.POST.getlist('ids[]')
        nome_animal = request.POST.getlist('animais[]')
        especie_animal = request.POST.getlist('especies[]')
        idade_animal = request.POST.getlist('idades[]')
        sexo_animal = request.POST.getlist('sexos[]')
        cor_animal = request.POST.getlist('cores[]')
        print(id_animal, nome_animal, especie_animal, idade_animal, sexo_animal, cor_animal)

        
        obj = Usuario.objects.get(id=id1)
        obj.nome = nome
        obj.cpf = cpf
        obj.rg = rg
        obj.email = email
        obj.telefone1 = telefone1
        obj.telefone2 = telefone2
        obj.cep = cep
        obj.endereco = endereco
        obj.numero = numero
        obj.bairro = bairro
        obj.cidade = cidade
        obj.uf = uf
        obj.obs = obs
        #print ("\n" * 130) 
        #print(nome, cpf, rg, email, telefone1, telefone2, cep, endereco, numero, bairro, cidade, uf, obs)
        obj.save()

        for id_animal, nome_animal, especie_animal, idade_animal, sexo_animal, cor_animal in zip(id_animal, nome_animal, especie_animal, idade_animal, sexo_animal, cor_animal):
             #   |animal = Animais(usuario = id1, nome_animal = nome_animal, especie_animal = especie_animal, idade_animal = idade_animal, sexo_animal = sexo_animal, cor_animal = cor_animal)
          #  animal.save()
            print(id_animal)
            if id_animal == "":
                print("novo animal cadastrado")
                animal = Animais(
                    usuario = obj,
                    nome_animal = nome_animal,
                    especie_animal = especie_animal,
                    idade_animal = idade_animal,
                    sexo_animal = sexo_animal,
                    cor_animal = cor_animal,
                )
                animal.save()
                #print(animal)
            else:
                print("atualizacao de animal")
                #animal = Animais(usuario = id1, 
                animal = Animais.objects.get(id = id_animal)
                #print(animal.nome_animal)
                animal.nome_animal = nome_animal
                #print(nome_animal)
                animal.especie_animal = especie_animal
                animal.idade_animal = idade_animal
                animal.sexo_animal = sexo_animal
                animal.cor_animal = cor_animal
                animal.save()

        data= Usuario.objects.filter(id__iexact=id1)
        data1 = json.loads(serializers.serialize('json',data))
        data1 = [{'fields': i['fields'], 'id': i['pk']} for i in data1]
        context = {'dados':data1}
        #print(context)
        return JsonResponse(context)    


def apaga_animal(request, id):
    try:
        animal = Animais.objects.get(id=id)
        animal.delete()
        print('animal apagado com sucesso')
        return redirect(reverse('cadastro'))
    except:
        return redirect(reverse('cadastro'))
 
def pre(request, id):
    usuario = Usuario.objects.get(id=id)
    dados = {
       'id':usuario.id,
       'nome': usuario.nome,
       'cpf' : usuario.cpf,
       'rg': usuario.rg,
       'endereco' : usuario.endereco,
       'numero': usuario.numero,
       'cidade' : usuario.cidade,
       'telefone1' : usuario.telefone1,
       'telefone2' : usuario.telefone2,
       'email': usuario.email,
       'animais': Animais.objects.filter(usuario=usuario.id)
    }
    return render(request,'pre.html', dados)

def pos(request, id):
    usuario = Usuario.objects.get(id=id)
    dados = {
       'id':usuario.id,
       'nome': usuario.nome,
       'cpf' : usuario.cpf,
       'rg': usuario.rg,
       'endereco' : usuario.endereco,
       'numero': usuario.numero,
       'cidade' : usuario.cidade,
       'telefone1' : usuario.telefone1,
       'telefone2' : usuario.telefone2,
       'email': usuario.email,
       'animais': Animais.objects.filter(usuario=usuario.id)
    }
    return render(request,'pos.html', dados)

def obter_valores(request):

    data= date.today()
    mes = data.month
    ano = data.year

    #canino_femea = Animais.objects.filter(usuario__data_cadastro__month=mes, usuario__data_cadastro__year=ano, especie_animal='Canino', sexo_animal='Femea').aggregate(total_animais=Count('id'))
    #canino_femea = canino_femea['total_animais']
    canino_femea = Animais.objects.filter(data_cad_anim__year=ano, data_cad_anim__month=mes, especie_animal='Canino', sexo_animal='Femea').count()
    #canino_macho = Animais.objects.filter(usuario__data_cadastro__month=mes, usuario__data_cadastro__year=ano, especie_animal='Canino', sexo_animal='Macho').aggregate(total_animais=Count('id'))
    #canino_macho = canino_macho['total_animais']
    canino_macho = Animais.objects.filter(data_cad_anim__year=ano, data_cad_anim__month=mes, especie_animal='Canino', sexo_animal='Macho').count()
    #felino_femea = Animais.objects.filter(usuario__data_cadastro__month=mes, usuario__data_cadastro__year=ano, especie_animal='Felino', sexo_animal='Femea').aggregate(total_animais=Count('id'))
    #felino_femea = felino_femea['total_animais']
    felino_femea = Animais.objects.filter(data_cad_anim__year=ano, data_cad_anim__month=mes, especie_animal='Felino', sexo_animal='Femea').count()
    #felino_macho = Animais.objects.filter(usuario__data_cadastro__month=mes, usuario__data_cadastro__year=ano, especie_animal='Felino', sexo_animal='Macho').aggregate(total_animais=Count('id'))
    #felino_macho = felino_macho['total_animais']
    felino_macho = Animais.objects.filter(data_cad_anim__year=ano, data_cad_anim__month=mes, especie_animal='Felino', sexo_animal='Macho').count()
    
    try:
        if Valores.objects.get(id=1):
            valores = Valores.objects.get(id=1)
            valor_referencia = valores.referencia
            valor_canino_femea = valores.canino_femea
            valor_canino_macho = valores.canino_macho
            valor_felino_femea = valores.felino_femea
            valor_felino_macho = valores.felino_macho
        else:
            valor_referencia = 0
            valor_canino_femea = 0
            valor_canino_macho = 0
            valor_felino_femea = 0
            valor_felino_macho = 0
        
        valor_canino_femea = valor_canino_femea * canino_femea
        valor_canino_macho = valor_canino_macho * canino_macho
        valor_felino_femea = valor_felino_femea * felino_femea
        valor_felino_macho = valor_felino_macho * felino_macho
        total = valor_canino_femea+valor_canino_macho+valor_felino_femea+valor_felino_macho
    except:
        valor_canino_femea = 0
        valor_canino_macho = 0
        valor_felino_femea = 0
        valor_felino_macho = 0
        total = 0
        valor_referencia = 0
    
    if total > valor_referencia:
        print("ultrapassou o valor de referencia")

    print('Valores: Qtde/Canino/Femea: {}, Qtde/Canino/Macho: {}, Qtde/Felino/Femea: {}, Qtde/Felino/Macho: {}'.format(canino_femea, canino_macho, felino_femea, felino_macho))
    print('valor total: R$/Canino/Femea: {}, R$/Canino/Macho: {}, R$/Felino/Femea: {}, R$/Felino/Macho: {}'.format(valor_canino_femea, valor_canino_macho,valor_felino_femea,valor_felino_macho))

    context = {'valor_total':total, 'referencia':valor_referencia}
    return JsonResponse(context)