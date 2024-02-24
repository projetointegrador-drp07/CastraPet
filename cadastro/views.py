from django.shortcuts import render
from django.http import HttpResponse
from .models import Usuario, Animais

def cadastro(request):
    if request.method == "GET":
        return render(request, 'cadastro.html')
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

        return HttpResponse('Cadastrado com sucesso!')