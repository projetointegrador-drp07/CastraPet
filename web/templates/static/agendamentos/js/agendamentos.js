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

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        themeSystem: 'bootstrap',
        initialView: 'dayGridMonth',
        selectable: true,
        dateClick: function(info) {
            //alert('clicked ' + info.dateStr);
            var data_escolhida = new Date(info.dateStr);
            var dia = data_escolhida.getDate() +1;
            console.log(dia);
            var mes = data_escolhida.getMonth() + 1;
            console.log(mes +1);
            var ano = data_escolhida.getFullYear();
            console.log(ano);
            console.log(data_escolhida);
            //correcao = format
            //data_escolhida.toLocaleDateString('pt-BR');
            $('#data_selecionada').val(dia +"/"+mes + "/"+ano);
        },
    });
    calendar.setOption('height', 500);
    calendar.setOption('contentHeight', 500);
    calendar.setOption('locale', 'br');
    
    //calendar.setOption('aspectRatio', 3);
    calendar.render();
  });

function ObterDados() {
    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    dados = $("#pesquisa_nome").val();
    tipo = $("#selecao_pesquisa").val();
    //console.log(tipo)
    $.ajax({
        type:'POST',
        url:'seleciona_dados',
        headers:{'X-CSRFToken':csrf_token},
        data:{
            pesquisa_nome: dados,
            tipo: tipo,
            csrfmiddlewaretoken: csrf_token,
        },
        success: (data) => {
            displayData(data)
        }
        
    })
}
function displayData(data) {
    //$('#exampleModal').modal('hide');
    document.getElementById('exibe_usuarios').remove();
    var novodiv = document.createElement("div");
    novodiv.id = "exibe_usuarios";
    var pesquisa = document.querySelector("#pesquisa_exibe");
    pesquisa.appendChild(novodiv);
    const codigo = ' <table id = "tabela_usuarios" class="table table-hover">'
    +'<thead>'
    +'<tr>'
    +'<th scope="col">#</th>'
    +'<th scope="col">CPF</th>'
    +'<th scope="col">Nome</th>'
    +'<th scope="col">Endereço</th>'
    +'<th scope="col">Telefone</th>'
    +'<th scope="col">Telefone</th>'
    +'<th scope="col"></th>'
    +'</tr>'
    +'</thead>'
    +'<tbody id="dados_usuarios">'
    
    
    document.getElementById('exibe_usuarios').innerHTML += codigo;
    for(i=0; i<data['dados'].length; i++){
        nome =  data['dados'][i]['fields']['nome'];
        $('#dados_usuarios').append('<tr id="user-' + data['dados'][i]['id'] + '"><td class="userData" id="user-id-' + data['dados'][i]['id'] + '" name="user-id">' + data['dados'][i]['id'] + '</td>'
                                    +'<td class="userData" id="user-cpf-' + data['dados'][i]['id'] + '" name="user-cpf">' + data['dados'][i]['fields']['cpf'] + '</td>'
                                    +'<td class="userData" id="user-nome-' + data['dados'][i]['id'] + '"name="user-nome">' + data['dados'][i]['fields']['nome'] + '</td>'
                                    +'<td class="userData" id="user-endereco-' + data['dados'][i]['id'] + '"name="user-endereco">' + data['dados'][i]['fields']['endereco'] + '</td>'
                                    +'<td class="userData" id="user-telefone1-' + data['dados'][i]['id'] + '"name="user-telefone1">' + data['dados'][i]['fields']['telefone1'] + '</td>'
                                    +'<td class="userData" id="user-telefone2-' + data['dados'][i]['id'] + '"name="user-telefone2">' + data['dados'][i]['fields']['telefone2'] + '</td>'
                                    +'<td><span><i class="fas fa-trash"></i></span><button class="btn btn-secondary w-100 py-1" data-dismiss="modal" onclick="SelectUser('+ data["dados"][i]["id"] + ',\''+nome+'\')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">'
                                    +'<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>'
                                    +'<path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>'
                                    +'</svg> Selecionar</button></a></td>'
                                    )
    }
    $('#tabela_usuarios').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/2.0.2/i18n/pt-BR.json',
            
        },
        "bFilter": false,
    });
    
}

function SelectUser(id, nome){
    console.log(nome);
    $('#codigo').val(id);
    $('#nome').val(nome);
    Seleciona_Animais(id);
}

function Seleciona_Animais(id){
    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    //console.log(dados)
    $.ajax({
        type:'POST',
        url:'seleciona_animais',
        headers:{'X-CSRFToken':csrf_token},
        data:{
            pesquisa_animal: id,
            csrfmiddlewaretoken: csrf_token,
        },
        success: (data) => {
            Exibe_Animais(data)
        }
        
    })
}
function Exibe_Animais(data){
    console.log(data)
    document.getElementById('exibe_animais').remove();
    var novodiv = document.createElement("div");
    novodiv.id = "exibe_animais";
    var pesquisa = document.querySelector("#animais");
    pesquisa.appendChild(novodiv);
    const codigo = ' <table id = "tabela_animais" class="table table-hover">'
    +'<thead>'
    +'<tr>'
    +'<th scope="col">#</th>'
    +'<th scope="col">Nome</th>'
    +'<th scope="col">Espécie</th>'
    +'<th scope="col">Idade</th>'
    +'<th scope="col">Sexo</th>'
    +'<th scope="col">Selecionar</th>'
    +'</tr>'
    +'</thead>'
    +'<tbody id="dados_animais">'
    document.getElementById('exibe_animais').innerHTML += codigo;
    for(i=0; i<data['animais'].length; i++){
        
        if((data['animais'][i]['fields']['castr']) === 0){
                $('#dados_animais').append('<tr id="animal-' + data['animais'][i]['id'] + '"><td class="animalData" id="animal-id-' + data['animais'][i]['id'] + '" name="animal-id">' + data['animais'][i]['id'] + ''
                +'<input type="hidden" class="form-control id_animal_ativo" id = "id_animal_ativo" name="id_animal_ativo" value="'+ data['animais'][i]['id'] +'"></td>'
                +'<td class="animalData" id="animal-nome-' + data['animais'][i]['id'] + '"name="animal-nome">' + data['animais'][i]['fields']['nome_animal'] + '</td>'
                +'<td class="animalData" id="animal-especie-' + data['animais'][i]['id'] + '"name="animal-especie">' + data['animais'][i]['fields']['especie_animal'] + '</td>'
                +'<td class="animalData" id="animal-idade-' + data['animais'][i]['id'] + '"name="animal-idade">' + data['animais'][i]['fields']['idade_animal'] + '</td>'
                +'<td class="animalData" id="animal-sexo-' + data['animais'][i]['id'] + '"name="animal-sexo">' + data['animais'][i]['fields']['sexo_animal'] + '</td>'
                +'<td><input type="checkbox" name ="seleciona_animal" id="seleciona_animal-' + data['animais'][i]['id'] + '" checked enabled style="width:35px; height:35px;"></td>'
                )
        }else{
                $('#dados_animais').append('<tr id="animal-' + data['animais'][i]['id'] + '"><td class="animalData" id="animal-id-' + data['animais'][i]['id'] + '" name="animal-id">' + data['animais'][i]['id'] + ''
                +'<input type="hidden" class="form-control id_animal_inativo" id = "id_animal_inativo" name="id_animal_inativo" value="'+ data['animais'][i]['id'] +'"></td>'
                +'<td class="animalData" id="animal-nome-' + data['animais'][i]['id'] + '"name="animal-nome"><s>' + data['animais'][i]['fields']['nome_animal'] + '</s></td>'
                +'<td class="animalData" id="animal-especie-' + data['animais'][i]['id'] + '"name="animal-especie"><s>' + data['animais'][i]['fields']['especie_animal'] + '</s></td>'
                +'<td class="animalData" id="animal-idade-' + data['animais'][i]['id'] + '"name="animal-idade"><s>' + data['animais'][i]['fields']['idade_animal'] + '</s></td>'
                +'<td class="animalData" id="animal-sexo-' + data['animais'][i]['id'] + '"name="animal-sexo"><s>' + data['animais'][i]['fields']['sexo_animal'] + '</s></td>'
                +'<td><input type="checkbox" name ="seleciona_animal" id="seleciona_animal_disabled" checked disabled style="width:35px; height:35px;"></td>'
                )
        }                           
                                    
    }
    
}

function agendar(){
    codigo = $('input[id="codigo"]').val();
    //alert(codigo)
    if(codigo===""){
        alert("selecione um usuario!");
        
    }else{
        data = document.getElementById('data_selecionada').value;
        //alert(data)
        if (data===""){
            alert("Selecione uma data!");
        }else{
            data_agendamento = $('input[id="data_selecionada"]').val();
            usuario_agendamento = $('input[id="nome"]').val();
            var ids = [];
            var ids_animal = document.querySelectorAll(".id_animal_ativo");
            var id_animais = [].map.call(ids_animal, function(input){
                return ids.push(input.value);
            });
            console.log("quantidade de itens que podem selecionados")
            console.log(ids.length)
            for (i=0;i<ids.length;i++){
                //console.log(ids[i])
                varia = ids[i]
                console.log("id do item:")
                console.log(varia)
                controle = document.getElementById('seleciona_animal-'+varia);
                console.log("Esta selecionado ou nao:")
                console.log(controle.checked)
                if(!controle.checked){
                    var index = ids.indexOf(varia)
                    console.log("vou excluir o item da posicao:")
                    console.log(index)
                    ids.splice(index,1)
                    i--
                }
           
            }
            console.log(ids)
            if(ids.length>0){
                confirmar = confirm("Deseja Gravar agendamento para o dia " + data_agendamento + " do usuário " + usuario_agendamento + "?")
                if(confirmar){
                    $('#codigo').val("");
                    $('#nome').val("");
                    $('#data_selecionada').val("");
                    document.getElementById('exibe_animais').remove();
                    var novodiv = document.createElement("div");
                    novodiv.id = "exibe_animais";
                    var pesquisa = document.querySelector("#animais");
                    pesquisa.appendChild(novodiv);
                    alert("Dados gravados com sucesso!");
                }
            }else{
                alert("Não existem animais selecionados!")
            }


        }
    }
 
}

document.addEventListener('DOMContentLoaded', function(){ 
    //$('#myTable').DataTable();
    //alert("Carregado")
    $('#tabela_usuarios').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/2.0.2/i18n/pt-BR.json',
        },
        "bFilter": false,
        
    });

}, false );