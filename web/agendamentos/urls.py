from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.agendamentos, name = "agendamentos"),
    path('seleciona_dados', views.seleciona_dados, name="seleciona_dados"),
    path('seleciona_animais', views.seleciona_animais, name="seleciona_animais"),
    path('grava_agendamentos', views.grava_agendamentos, name="grava_agendamentos"),
    path('exibe_agendamentos', views.exibe_agendamentos, name = "exibe_agendamentos"),
    ]
