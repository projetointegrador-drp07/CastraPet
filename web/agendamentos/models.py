from django.db import models
from cadastro.models import Usuario, Animais

class Agendamentos(models.Model):
    data_cadastro =models.DateField(auto_now_add=True)
    data_agendamento = models.DateField()
    cod_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, null = True)


class Animais_agendados(models.Model):
    cod_agendamento = models.ForeignKey(Agendamentos, on_delete=models.CASCADE, null = True)
    cod_animal = models.ForeignKey(Animais, on_delete=models.CASCADE, null = True)


