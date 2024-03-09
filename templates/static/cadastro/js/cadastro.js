const tabs = document.querySelectorAll('.tab-btn');

tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));

const tabClicked = (tab) => {
    tabs.forEach(tab => tab.classList.remove('active'));
    tab.classList.add('active');

    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('show'));

    const contentId= tab.getAttribute('content-id');
    const content = document.getElementById(contentId);
    
    content.classList.add('show');
}

function add_animal(){
    const subject = document.querySelector("#subject");
    const codigo = "<div id='adicionados'>"
    +"<div class='row'><div class='col-md-8'>Nome do animal:<input type='text' class='form-control' placeholder='Nome do animal' name='nome_animal'><br></div><div class='col-md'>Espécie:<input type='text' class='form-control' placeholder='Espécie' name='especie_animal'><br></div></div>"
    +"<div class='row'><div class='col-md-2'>Idade:<input type='text' class='form-control' placeholder='' name='idade_animal'><br></div><div class='col-md'>Sexo:<input type='text' class='form-control' placeholder='sexo' name='sexo_animal'><br></div><div class='col-md'>Cor:<input type='text' class='form-control' placeholder='cor' name='cor_animal'><br></div>"
    +"<div class='col-md-1 align-self-center'><button type='button' onclick='remove_animal(this)' class='btn btn-secondary w-60 ' alt='Excluir Animal'>"
    +"<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-plus-circle-fill' viewBox='0 0 16 16'>"
    +"<path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z'/></svg></button></div></div><hr style='background-color:gray;'></div>";
    subject.insertAdjacentHTML("beforebegin",codigo,);
}

function remove_animal(e){
    e.parentNode.parentNode.parentNode.outerHTML = '';
}

function add_animal_modal(){
    const subject = document.getElementById("exibe_animais_modal");
    const codigo = "<div id='animal_adicionado'><div class='row'>"
    +"<div><input type='hidden' class='form-control id_animal_modal' id = 'id_animal_modal' name='id_animal_modal' value=''></div>"
    +"<div class='form-group col-md-5'>"
    +"Nome do animal:<input type='text' class='form-control nome_animal_modal' placeholder='Nome do animal' id = 'nome_animal_modal' name='nome_animal_modal' value=''></div>"
    +"<div class='form-group col-md-4'>"
    +"Espécie:<input type='text' class='form-control especie_animal_modal' placeholder='Espécie' name='especie_animal_modal' value=''></div>"
    +"</div>"
    +"<div class='row'>"
    +"<div class='form-group col-md-3'>"
    +"Idade:<input type='text' class='form-control idade_animal_modal' placeholder='' name='idade_animal_modal' value=''></div>"
    +"<div class='form-group col-md-3'>"
    +"Sexo:<input type='text' class='form-control sexo_animal_modal' placeholder='sexo' name='sexo_animal_modal' value=''></div>"
    +"<div class='form-group col-md-3'>"
    +"Cor:<input type='text' class='form-control cor_animal_modal' placeholder='cor' name='cor_animal_modal' value=''></div>"
    +"<div>"
    +"  "
    +"<button type='button' onclick='apagar_animal_novo_modal(this)' class='btn btn-danger btn-sm btn-alterar'>Excluir</button>"
    +"</div>"
    +"</div>"
    +"<div>"
    +"<hr style='background-color:gray;'>"
    +"</div>"
    +"</div>";
    subject.insertAdjacentHTML("afterbegin",codigo,);
}

function pesquisa_cep(cep, tipo) {
    $.ajax({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        type: 'GET',
        success: function(data) {
            if (tipo =="1"){
                $('#logradouro').val(data.logradouro);
                $('#bairro').val(data.bairro);
                $('#cidade').val(data.localidade);
                $('#UF').val(data.uf);
            }else if (tipo =="2"){
                $('#endereco_modal').val(data.logradouro);
                $('#bairro_modal').val(data.bairro);
                $('#cidade_modal').val(data.localidade);
                $('#uf_modal').val(data.uf);
            }
        },
        error: function() {
            alert('Erro ao buscar CEP. Por favor, tente novamente.');
        }
    });
}

document.getElementById('pesquisa_usuario').addEventListener('submit', function(event){
    event.preventDefault();
    dados = document.getElementById('pesquisa_nome').value;
    //console.log(dados)
    ObterDados(dados);
})

function ObterDados(dados) {
    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    $.ajax({
        type:'POST',
        url:'exibe_dados',
        headers:{'X-CSRFToken':csrf_token},
        data:{
            pesquisa_nome: dados,
            csrfmiddlewaretoken: csrf_token,
        },
        success: (data) => {
            displayData(data)
        }
        
    })
}

function displayData(data) {
    document.getElementById('exibe_usuarios').remove();
    var novodiv = document.createElement("div");
    novodiv.id = "exibe_usuarios";
    var pesquisa = document.querySelector("#pesquisa");
    pesquisa.appendChild(novodiv);
    const codigo = ' <table id = "tabela_usuarios" class="table table-hover">'
        +'<tr>'
        +'<td scope="col">#</td>'
        +'<td scope="col">CPF</td>'
        +'<td scope="col">Nome</td>'
        +'<td scope="col">Endereço</td>'
        +'<td scope="col">Telefone</td>'
        +'<td scope="col">Telefone</td>'
        +'</tr>'
        +'<tbody id="dados_usuarios">'
        +'<tr>'
    document.getElementById('exibe_usuarios').innerHTML += codigo;

    for(i=0; i<data['dados'].length; i++){
        $('#dados_usuarios').append('<tr id="user-' + data['dados'][i]['id'] + '"><td class="userData" id="user-id-' + data['dados'][i]['id'] + '" name="user-id">' + data['dados'][i]['id'] + '</td>'
                                    +'<td class="userData" id="user-cpf-' + data['dados'][i]['id'] + '" name="user-cpf">' + data['dados'][i]['fields']['cpf'] + '</td>'
                                    +'<td class="userData" id="user-nome-' + data['dados'][i]['id'] + '"name="user-nome">' + data['dados'][i]['fields']['nome'] + '</td>'
                                    +'<td class="userData" id="user-endereco-' + data['dados'][i]['id'] + '"name="user-endereco">' + data['dados'][i]['fields']['endereco'] + '</td>'
                                    +'<td class="userData" id="user-telefone1-' + data['dados'][i]['id'] + '"name="user-telefone1">' + data['dados'][i]['fields']['telefone1'] + '</td>'
                                    +'<td class="userData" id="user-telefone2-' + data['dados'][i]['id'] + '"name="user-telefone2">' + data['dados'][i]['fields']['telefone2'] + '</td>'
                                    +'<td><span><i class="fas fa-trash"></i></span><button class="btn btn-secondary w-100 py-1" data-toggle="modal" data-target="#exampleModal" onclick="editUser(' + data['dados'][i]['id'] + ')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">'
                                    +'<path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>'
                                    +'</svg> Editar</button></a></td>'
                                    +'<td><a href="/termo/' + data['dados'][i]['id'] + '"><span><i class="fas fa-trash"></i></span>'
                                    +'<button class="btn btn-secondary w-100 py-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">'
                                    +'<path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>'
                                    +'<path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>'
                                    +'</svg> Imprimir</button></a></td>'
                                    +'<td><a id="confirmacao" href="/apagar_usuario/' + data['dados'][i]['id'] + '" onclick="return confirm("Tem certeza?")"><span><i class="fas fa-trash"></i></span>'
                                    +'<button class="btn btn-secondary w-100 py-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">'
                                    +'<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>'
                                    +'</svg> Apagar</button></a></td></tr>')
    }
 
}

function editUser(id){
    if (id){
        
        csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
        $.ajax({
            type:'POST',
            url:'edita_dados',
            headers:{'X-CSRFToken':csrf_token},
            data:{
                id: id,
                csrfmiddlewaretoken: csrf_token,
            },
            success: (data) => {
                id = data['dados'][0]['id'];
                nome = data['dados'][0]['fields']['nome'];
                cpf = data['dados'][0]['fields']['cpf'];
                rg = data['dados'][0]['fields']['rg'];
                email = data['dados'][0]['fields']['email'];
                telefone1 = data['dados'][0]['fields']['telefone1'];
                telefone2 = data['dados'][0]['fields']['telefone2'];
                cep = data['dados'][0]['fields']['cep'];
                endereco = data['dados'][0]['fields']['endereco'];
                numero = data['dados'][0]['fields']['numero'];
                bairro = data['dados'][0]['fields']['bairro'];
                cidade =  data['dados'][0]['fields']['cidade'];
                uf = data['dados'][0]['fields']['uf'];
                obs = data['dados'][0]['fields']['obs'];
                //console.log(nome, cpf, rg, email, telefone1, telefone2, cep, endereco, numero, bairro, cidade, uf, obs)
                $('#form-id').val(id)
                $('#nome_modal').val(nome);
                $('#cpf_modal').val(cpf);
                $('#rg_modal').val(rg);
                $('#email_modal').val(email);
                $('#telefone1_modal').val(telefone1);
                $('#telefone2_modal').val(telefone2);
                $('#cep_modal').val(cep);
                $('#endereco_modal').val(endereco);
                $('#numero_modal').val(numero);
                $('#bairro_modal').val(bairro);
                $('#cidade_modal').val(cidade);
                $('#uf_modal').val(uf);
                $('#observacoes_modal').val(obs);

                div_animais = document.getElementById("exibe_animais_modal");
                div_animais.innerHTML="";
                for(i=0;i<data['animais'].length; i++){
                    console.log(data['animais'][i])
                    div_animais.innerHTML += "<div id='animal_cadastrado-"+ data['animais'][i]['id'] + "'><div class='row'>"
                    +"<div><input type='hidden' class='form-control id_animal_modal' id = 'id_animal_modal' name='id_animal_modal' value='"+ data['animais'][i]['id'] +"'></div>"
                    +"<div class='form-group col-md-5'>"
                    +"Nome do animal:<input type='text' class='form-control nome_animal_modal' placeholder='Nome do animal' id = 'nome_animal_modal' name='nome_animal_modal' value='"+ data['animais'][i]['fields']['nome_animal']+"'></div>"
                    +"<div class='form-group col-md-4'>"
                    +"Espécie:<input type='text' class='form-control especie_animal_modal' placeholder='Espécie' name='especie_animal_modal' value='"+ data['animais'][i]['fields']['especie_animal']+"'></div>"
                    
                    +"</div>"
                    +"<div class='row'>"
                    +"<div class='form-group col-md-3'>"
                    +"Idade:<input type='text' class='form-control idade_animal_modal' placeholder='' name='idade_animal_modal' value='"+ data['animais'][i]['fields']['idade_animal']+"'></div>"
                    +"<div class='form-group col-md-3'>"
                    +"Sexo:<input type='text' class='form-control sexo_animal_modal' placeholder='sexo' name='sexo_animal_modal' value='"+ data['animais'][i]['fields']['sexo_animal']+"'></div>"
                    +"<div class='form-group col-md-3'>"
                    +"Cor:<input type='text' class='form-control cor_animal_modal' placeholder='cor' name='cor_animal_modal' value='"+ data['animais'][i]['fields']['cor_animal']+"'></div>"
                    +"<div>"
                    +"  "
                    +"<button type='button' onclick='apagar_animal_modal("+ data['animais'][i]['id'] +")' class='btn btn-danger btn-sm btn-alterar'>Excluir</button>"
                    +"</div>"
                    +"</div>"
                    +"<div>"
                    +"<hr style='background-color:gray;'>"
                    +"</div></div>";
                    
                }
            }
       })
    }
}

document.getElementById('updateUser').addEventListener('submit', function(event){
    event.preventDefault();
    var id = $('input[id="form-id"]').val();
    var nome = $('input[id="nome_modal"]').val();
    var cpf =  $('input[id="cpf_modal"]').val();
    var rg =  $('input[id="rg_modal"]').val();
    var email =  $('input[id="email_modal"]').val();
    var telefone1 =  $('input[id="telefone1_modal"]').val();
    var telefone2 =  $('input[id="telefone2_modal"]').val();
    var cep =  $('input[id="cep_modal"]').val();
    var endereco =  $('input[id="endereco_modal"]').val();
    var numero =  $('input[id="numero_modal"]').val();
    var bairro =  $('input[id="bairro_modal"]').val();
    var cidade =   $('input[id="cidade_modal"]').val();
    var uf =  $('input[id="uf_modal"]').val();
    var obs =  document.getElementById('observacoes_modal').value;
    var ids = [];
    var ids_animal = document.querySelectorAll(".id_animal_modal");
    var animais = [];
    var nome_animal = document.querySelectorAll(".nome_animal_modal");
    var especies = [];
    var especie_animal = document.querySelectorAll(".especie_animal_modal");
    var idades = [];
    var idade_animal = document.querySelectorAll(".idade_animal_modal");
    var sexos = [];
    var sexo_animal = document.querySelectorAll(".sexo_animal_modal");
    var cores = [];
    var cor_animal = document.querySelectorAll(".cor_animal_modal");
    
    var id_animais = [].map.call(ids_animal, function(input){
        return ids.push(input.value);
    });

    var nomes_animais = [].map.call(nome_animal, function(input){
        return animais.push(input.value);
    });
    var especies_animais = [].map.call(especie_animal, function(input){
        return especies.push(input.value);
    });
    var idades_animais = [].map.call(idade_animal, function(input){
        return idades.push(input.value);
    });
    var sexos_animais = [].map.call(sexo_animal, function(input){
        return sexos.push(input.value);
    });
    var cores_animais = [].map.call(cor_animal, function(input){
        return cores.push(input.value);
    });

    
    $.ajax({
        url: 'att_usuario',
        type:'POST',
        headers:{'X-CSRFToken':csrf_token},
        data:{
            id: id,
            nome: nome,
            cpf: cpf,
            rg: rg,
            email: email,
            telefone1: telefone1,
            telefone2: telefone2,
            cep: cep,
            endereco: endereco,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            observacoes: obs,
            ids:ids,
            animais: animais,
            especies: especies,
            idades: idades,
            sexos, sexos,
            cores: cores,
            csrfmiddlewaretoken: csrf_token,
        },
        dataType: 'json',
        success: (data) => {
            dados = document.getElementById('pesquisa_nome').value;
            //console.log(dados)
            ObterDados(dados);
        }
    });


    $('form#updateUser').trigger("reset");
    $('#exampleModal').modal('hide');
    return false;
});

function apagar_animal_modal(id){
    console.log(id)
    if (id){
        alert("Deseja apagar o animal? "+ id );
        csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
        $.ajax({
            type:'POST',
            url:'apaga_animal/'+id,
            headers:{'X-CSRFToken':csrf_token},
            data:{
                id_animal: id,
                csrfmiddlewaretoken: csrf_token,
            },
            success: () => {
                //displayData(data)
                var div_animal = document.getElementById("animal_cadastrado-"+id+"");
                div_animal.remove();
            }
            
        })
    }
}

function apagar_animal_novo_modal(e){
    e.parentNode.parentNode.parentNode.outerHTML = '';
}