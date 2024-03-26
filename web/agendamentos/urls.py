from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.agendamentos, name = "agendamentos"),
    path('seleciona_dados', views.seleciona_dados, name="seleciona_dados"),
    path('seleciona_animais', views.seleciona_animais, name="seleciona_animais"),
    ]
