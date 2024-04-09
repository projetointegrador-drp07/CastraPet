from django.shortcuts import render
from django.db.models.aggregates import Count
from cadastro.models import Usuario, Animais
from django.http import JsonResponse

def analise(request):
    dados_anos = Usuario.objects.values('data_cadastro__year').annotate(total_por_ano=Count('data_cadastro__year'))
    anos = []
    for ano in dados_anos:
        anos.append(ano['data_cadastro__year'])

    seleciona_meses = anos[-1]
    dados_meses = Usuario.objects.values('data_cadastro__month').filter(data_cadastro__year=seleciona_meses).annotate(total_por_ano=Count('data_cadastro__month'))
    meses=[]
    for mes in dados_meses:
        meses.append(mes['data_cadastro__month'])

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
    
def seleciona_ano_mes(request):

    ano = request.GET.get('ano', '2024')
    dados_meses = Usuario.objects.values('data_cadastro__month').filter(data_cadastro__year=ano).annotate(total_por_ano=Count('data_cadastro__month'))
    meses=[]
    for mes in dados_meses:
        meses.append(mes['data_cadastro__month'])

    print(meses)
    dados={'meses':meses}
    return JsonResponse(dados)