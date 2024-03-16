from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.cadastro, name = "cadastro"),
    path('apagar_usuario/<int:id>', views.apagar_usuario, name = "apagar_usuario"),
    path('termo/<int:id>', views.termo, name = "termo"),
    path('edita_dados', views.edita_dados, name="edita_dados"),
    path('exibe_dados', views.exibe_dados, name="exibe_dados"),
    path('att_usuario', views.att_usuario, name="att_usuario"),
    path('apaga_animal/<int:id>', views.apaga_animal, name="apaga_animal"),
    ]
