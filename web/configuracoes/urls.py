from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.configuracoes, name = "configuracoes"),
    path('config_empresa', views.config_empresa, name="config_empresa"),
    path('exibe_profissionais', views.exibe_profissionais, name="exibe_profissionais"),
    path('salva_profissionais', views.salva_profissionais, name="salva_profissionais"),
    path('exclui_profissionais/<int:id>', views.exclui_profissionais, name="exclui_profissionais"),
    path('att_valores', views.att_valores, name="att_valores"),
    ]