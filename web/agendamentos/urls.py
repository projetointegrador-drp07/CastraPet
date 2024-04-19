from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.agendamentos, name = "agendamentos"),
    path('seleciona_dados', views.seleciona_dados, name="seleciona_dados"),
    path('seleciona_animais', views.seleciona_animais, name="seleciona_animais"),
    path('grava_agendamentos', views.grava_agendamentos, name="grava_agendamentos"),
    path('exibe_agendamentos', views.exibe_agendamentos, name = "exibe_agendamentos"),
    path('exibe_animais/<int:id>', views.exibe_animais, name = "exibe_animais"),
    path('exclui_agendamentos/<int:id>', views.exclui_agendamentos, name = "exclui_agendamentos"),
    ]
