from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.db.models.aggregates import Count
from cadastro.models import Usuario, Animais
from agendamentos.models import Agendamentos, Animais_agendados
from django.http import JsonResponse
from datetime import date
from configuracoes.models import Valores
from django.core import serializers
import json

@login_required
def analise(request):
    dados_anos = Usuario.objects.values('data_cadastro__year').annotate(total_por_ano=Count('data_cadastro__year'))
    anos = []
    for ano in dados_anos:
        anos.append(ano['data_cadastro__year'])

    if anos:
        seleciona_meses = anos[-1]
        dados_meses = Usuario.objects.values('data_cadastro__month').filter(data_cadastro__year=seleciona_meses).annotate(total_por_ano=Count('data_cadastro__month'))
        meses=[]
        for mes in dados_meses:
            meses.append(mes['data_cadastro__month'])
    else:
        meses = ''

    print(anos, meses)
    if anos:
        anos = reversed(anos)
        meses = reversed(meses)
        dados = {
            'anos':anos,
            'meses':meses
            }
        print(dados)
        return render(request, 'analise.html', dados)
    else:
        dados = {
            'anos':'',
            'meses':'',
            }
        print(dados)
        return render(request, 'analise.html', dados)

@login_required    
def seleciona_ano_mes(request):
    ano_atual= date.today()
    ano_atual = ano_atual.year
    ano = request.GET.get('ano', ano_atual)
    dados_meses = Usuario.objects.values('data_cadastro__month').filter(data_cadastro__year=ano).annotate(total_por_ano=Count('data_cadastro__month'))
    meses=[]
    for mes in dados_meses:
        meses.append(mes['data_cadastro__month'])

    print(meses)
    dados={'meses':meses}
    return JsonResponse(dados)

@login_required
def exibe_dados(request):
    ano_atual = date.today()
    mes_atual = ano_atual.month
    ano_atual = ano_atual.year
    ano = request.GET.get('ano', ano_atual)
    mes = request.GET.get('mes', mes_atual)

    if mes == '13':
        total_cadastros_usuarios = Usuario.objects.filter(data_cadastro__year=ano).count()
        animais_cadastrados_total = Animais.objects.filter(data_cad_anim__year=ano).count()
        canino_femea = Animais.objects.filter(data_cad_anim__year=ano, especie_animal='Canino', sexo_animal='Femea').count()
        canino_macho = Animais.objects.filter(data_cad_anim__year=ano, especie_animal='Canino', sexo_animal='Macho').count()
        felino_femea = Animais.objects.filter(data_cad_anim__year=ano, especie_animal='Felino', sexo_animal='Femea').count()
        felino_macho = Animais.objects.filter(data_cad_anim__year=ano, especie_animal='Felino', sexo_animal='Macho').count()
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
        valor_total_animais = valor_canino_femea+valor_canino_macho+valor_felino_femea+valor_felino_macho
        if valor_total_animais > 0 and valor_referencia > 0:
            percentual = round(((valor_total_animais / (valor_referencia*12)) * 100),2)
        else:
            percentual = 0

        qtde_por_bairros = Usuario.objects.values('bairro').filter(data_cadastro__year=ano).annotate(qtde_cad_por_bairros=Count('bairro')).order_by('-qtde_cad_por_bairros')[:5]
        bairros_list=[]
        qtde_bairros =[]
        for bairro in qtde_por_bairros:
            #print(bairro['bairro'],bairro['qtde_cad_por_bairros'])
            bairro_json = bairro['bairro']
            qtde_bairros_json = bairro['qtde_cad_por_bairros']
            bairros_list.append(json.dumps(bairro_json, ensure_ascii=False))
            qtde_bairros.append(json.dumps(qtde_bairros_json, ensure_ascii=False))
        
        animais_cadastrados = Animais.objects.filter(data_cad_anim__year=ano)
        animais_agendados = Agendamentos.objects.filter(animais_agendados__cod_animal_id__in=animais_cadastrados)
        agendamentos = animais_agendados.count()
        falta_agendar = animais_cadastrados_total - agendamentos
    else:
        total_cadastros_usuarios = Usuario.objects.filter(data_cadastro__year=ano, data_cadastro__month=mes).count()
        animais_cadastrados_total = Animais.objects.filter(data_cad_anim__year=ano, data_cad_anim__month=mes).count()
        canino_femea = Animais.objects.filter(data_cad_anim__year=ano, data_cad_anim__month=mes, especie_animal='Canino', sexo_animal='Femea').count()
        canino_macho = Animais.objects.filter(data_cad_anim__year=ano, data_cad_anim__month=mes, especie_animal='Canino', sexo_animal='Macho').count()
        felino_femea = Animais.objects.filter(data_cad_anim__year=ano, data_cad_anim__month=mes, especie_animal='Felino', sexo_animal='Femea').count()
        felino_macho = Animais.objects.filter(data_cad_anim__year=ano, data_cad_anim__month=mes, especie_animal='Felino', sexo_animal='Macho').count()
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
        valor_total_animais = valor_canino_femea+valor_canino_macho+valor_felino_femea+valor_felino_macho
        if valor_total_animais > 0 and valor_referencia > 0:
            percentual = round(((valor_total_animais / valor_referencia) * 100),2)
        else:
            percentual = 0
        qtde_por_bairros = Usuario.objects.values('bairro').filter(data_cadastro__year=ano, data_cadastro__month=mes).annotate(qtde_cad_por_bairros=Count('bairro')).order_by('-qtde_cad_por_bairros')[:5]
        #print(qtde_por_bairros)
        bairros_list=[]
        qtde_bairros =[]
        for bairro in qtde_por_bairros:
            #print(bairro['bairro'],bairro['qtde_cad_por_bairros'])
            bairro_json = bairro['bairro']
            qtde_bairros_json = bairro['qtde_cad_por_bairros']
            bairros_list.append(json.dumps(bairro_json, ensure_ascii=False))
            qtde_bairros.append(json.dumps(qtde_bairros_json, ensure_ascii=False))

        #print(type(bairros_list[0]))
        #print(bairros_list, qtde_bairros)
        #agendamentos = Agendamentos.objects.filter(data_agendamento__year=ano, data_agendamento__month=mes).count()
        #falta_agendar = animais_cadastrados_total - agendamentos
        animais_cadastrados = Animais.objects.filter(data_cad_anim__month=mes, data_cad_anim__year=ano)
        animais_agendados = Agendamentos.objects.filter(animais_agendados__cod_animal_id__in=animais_cadastrados)
        agendamentos = animais_agendados.count()
        falta_agendar = animais_cadastrados_total - agendamentos

    dados = {
        'ano':ano,
        'mes':mes,
        'total_cadastros': total_cadastros_usuarios,
        'total_animais': animais_cadastrados_total,
        'qtde_canino_femea':canino_femea,
        'qtde_canino_macho':canino_macho,
        'qtde_felino_femea':felino_femea,
        'qtde_felino_macho':felino_macho,
        'valor_total_animais':valor_total_animais,
        'percentual': percentual,
        'bairros': bairros_list,
        'qtde_bairros': qtde_bairros,
        'agendamentos': agendamentos,
        'falta_agendar': falta_agendar,
    }
    return JsonResponse(dados)  
