from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import Empresa, Profissionais, Valores
from django.http import JsonResponse
import json
from django.core import serializers

@login_required
def configuracoes(request):
    if request.method =="GET":
        valores = Valores.objects.all()
        if valores:
            for a in valores:
                #print(str(a.referencia))
                referencia = {'referencia':str(a.referencia)}
                canino_femea = {'canino_femea':str(a.canino_femea)}
                canino_macho = {'canino_macho':str(a.canino_macho)}
                felino_femea = {'felino_femea':str(a.felino_femea)}
                felino_macho={'felino_macho':str(a.felino_macho)}
        else:
            referencia = '0'
            canino_femea = '0'
            canino_macho = '0'
            felino_femea = '0'
            felino_macho = '0'

             
        dados_empresa =  {'dados_empresa':Empresa.objects.all(), 'dados_profissionais':Profissionais.objects.all(), 'referencia':referencia, 'canino_femea':canino_femea,'canino_macho':canino_macho,'felino_femea':felino_femea,'felino_macho':felino_macho}
        
        return render(request, 'configuracoes.html', dados_empresa)
    
@login_required
def config_empresa(request):
    if request.method =="POST":
        empresa = request.POST.get('nome')
        endereco = request.POST.get('endereco')
        telefone1 = request.POST.get('telefone1')
        telefone2 = request.POST.get('telefone2')

        obj = Empresa.objects.all()
        if obj.exists():
            #print("Ja existe uma empresa no banco de dados")
            att_empresa = Empresa.objects.get(id=1)
            att_empresa.nome = empresa
            att_empresa.endereco = endereco
            att_empresa.telefone1 = telefone1
            att_empresa.telefone2 = telefone2
            att_empresa.save()
        else:
            #print("nao existe uma empresa cadastrada")
            nova_empresa = Empresa(
                nome = empresa,
                endereco = endereco,
                telefone1 = telefone1,
                telefone2 = telefone2,
            )
            nova_empresa.save()

        dados_empresa =  {'dados_empresa':Empresa.objects.all(), 'dados_profissionais':Profissionais.objects.all(), 'valores':Valores.objects.all()}
        return render(request, 'configuracoes.html', dados_empresa)

@login_required
def salva_profissionais(request):
    if request.method=="POST":
        medico = request.POST.get('profissional')
        crmv = request.POST.get('crmv')
        uf = request.POST.get('uf')
        #print(medico, crmv, uf)
        obj = Profissionais(
            profissional = medico,
            crmv = crmv,
            uf = uf,
        )
        obj.save()
        dados_empresa =  {'dados_empresa':Empresa.objects.all(), 'dados_profissionais':Profissionais.objects.all(), 'valores':Valores.objects.all()}
        return render(request, 'configuracoes.html', dados_empresa)

@login_required
def exibe_profissionais(request):
    if request.method=="POST":
        dados_profissionais = Profissionais.objects.all()
        data1 = json.loads(serializers.serialize('json',dados_profissionais))
        data1 = [{'fields': i['fields'], 'id': i['pk']} for i in data1]
        context = {'dados':data1}
        #print(context)
        return JsonResponse(context)

@login_required
def exclui_profissionais(request, id):
    if request.method=="POST":
            try:
                medico = Profissionais.objects.get(id=id)
                medico.delete()
                #print('medico apagado com sucesso')
                dados_profissionais = Profissionais.objects.all()
                data1 = json.loads(serializers.serialize('json',dados_profissionais))
                data1 = [{'fields': i['fields'], 'id': i['pk']} for i in data1]
                context = {'dados':data1}
                #print(context)
                return JsonResponse(context)
            except:
                dados_profissionais = Profissionais.objects.all()
                data1 = json.loads(serializers.serialize('json',dados_profissionais))
                data1 = [{'fields': i['fields'], 'id': i['pk']} for i in data1]
                context = {'dados':data1}
                #print(context)
                return JsonResponse(context)
            
@login_required
def att_valores(request):
    if request.method=="POST":
        referencia = request.POST.get('referencia')
        canino_femea = request.POST.get('canino_femea')
        canino_macho = request.POST.get('canino_macho')
        felino_femea = request.POST.get('felino_femea')
        felino_macho = request.POST.get('felino_macho')

        obj = Valores.objects.all()
        if obj.exists():
            #print("Ja existem valoresno banco de dados")
            att_valores = Valores.objects.get(id=1)
            att_valores.referencia = referencia
            att_valores.canino_femea = canino_femea
            att_valores.canino_macho = canino_macho
            att_valores.felino_femea = felino_femea
            att_valores.felino_macho=felino_macho
            att_valores.save()
            
        else:
            #print("nao existe valores cadastrados")
            att_valores = Valores(
                referencia = referencia,
                canino_femea = canino_femea,
                canino_macho = canino_macho,
                felino_femea = felino_femea,
                felino_macho=felino_macho,
            )
            att_valores.save()

        dados_empresa =  {'dados_empresa':Empresa.objects.all(), 'dados_profissionais':Profissionais.objects.all(), 'valores':Valores.objects.all()}
        return render(request, 'configuracoes.html', dados_empresa)