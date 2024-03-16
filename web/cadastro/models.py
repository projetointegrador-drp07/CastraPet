from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=255)
    cpf = models.CharField(max_length=11)
    rg = models.CharField(max_length=9)
    email = models.CharField(max_length=100)
    telefone1 = models.CharField(max_length=10)
    telefone2 = models.CharField(max_length=10)
    cep = models.CharField(max_length=8)
    endereco = models.CharField(max_length=255)
    numero = models.CharField(max_length=5)
    bairro = models.CharField(max_length=50)
    cidade = models.CharField(max_length=50)
    uf = models.CharField(max_length=2)
    obs = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.nome
    
class Animais(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, null = True)
    nome_animal = models.CharField(max_length=100)
    especie_animal = models.CharField(max_length=50)
    idade_animal = models.CharField(max_length=2)
    sexo_animal = models.CharField(max_length=10)
    cor_animal = models.CharField(max_length=20)
    castr = models.IntegerField(default=0)
    
