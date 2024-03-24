from django.shortcuts import render

# Create your views here.
def configuracoes(request):
    if request.method =="GET":
        return render(request, 'configuracoes.html')