from django.db import models

class Empresa(models.Model):
    nome = models.CharField(max_length=255)
    endereco = models.CharField(max_length=255)
    telefone1 = models.CharField(max_length=11)
    telefone2 = models.CharField(max_length=11)


    def __str__(self) -> str:
        return self.nome
    
class Profissionais(models.Model):
    profissional = models.CharField(max_length=255)
    crmv = models.CharField(max_length=15)
    uf = models.CharField(max_length=2)


    def __str__(self) -> str:
        return self.profissional
    
class Valores(models.Model):
    referencia = models.DecimalField(max_digits=7, decimal_places=2)
    canino_femea = models.DecimalField(max_digits=7, decimal_places=2)
    canino_macho = models.DecimalField(max_digits=7, decimal_places=2)
    felino_femea = models.DecimalField(max_digits=7, decimal_places=2)
    felino_macho = models.DecimalField(max_digits=7, decimal_places=2)

    