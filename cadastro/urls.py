from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.cadastro, name = "cadastro"),
    path('apagar_usuario/<int:id>', views.apagar_usuario, name = "apagar_usuario"),
    path('termo/<int:id>', views.termo, name = "termo"),
    path('editar_usuario/<int:id>', views.editar, name="editar"),
]
