from django.shortcuts import render
from .models import Usuario, Animais
from django.shortcuts import redirect
from django.urls import reverse
from django.http import JsonResponse, HttpResponse
import json
from django.core import serializers

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
       
        return render(request,'termo.html', dados)
    
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
        #print(id_animal, nome_animal, especie_animal, idade_animal, sexo_animal, cor_animal)

        
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


    
 