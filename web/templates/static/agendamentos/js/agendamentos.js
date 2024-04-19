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
                                    +'<td><span><i class="fas fa-trash"></i></span><button class="btn btn-secondary w-100 py-1 bt-seleciona" data-dismiss="modal" onclick="SelectUser('+ data["dados"][i]["id"] + ',\''+nome+'\')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">'
                                    +'<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>'
                                    +'<path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>'
                                    +'</svg> Selecionar</button></a></td>'
                                    )
    }
    $('#tabela_usuarios').DataTable({
        language: {
            url: '/static/dataTables/plug-ins/pt-BR.json',
            
        },
        'columnDefs': [{'width': '20%', 'targets': [2]}],
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
        Swal.fire({
            icon: "error",
            title: "Selecione um usuário!",
            showConfirmButton: false,
            timer: 1500
          });
        // alert("selecione um usuario!");
        
    }else{
        data = document.getElementById('data_selecionada').value;
        //alert(data)
        if (data===""){
            Swal.fire({
                icon: "error",
                title: "Selecione uma data!",
                showConfirmButton: false,
                timer: 1500
              });
        }else{
            data_agendamento = $('input[id="data_selecionada"]').val();
            usuario_agendamento = $('input[id="nome"]').val();
            id_usuario = $('input[id="codigo"]').val();
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
                Swal.fire({
                    title: "Confirma agendamento?",
                    text: "Agendamento do usuário: "+usuario_agendamento+" para a data: "+data_agendamento+" ",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sim, confirme!",
                    cancelButtonText: "Cancelar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                        //Gravar dados
                        $.ajax({
                            type:'POST',
                            url:'grava_agendamentos',
                            headers:{'X-CSRFToken':csrf_token},
                            data:{
                                usuario_agendamento: id_usuario,
                                data_agendamento: data_agendamento,
                                animais:ids,
                                csrfmiddlewaretoken: csrf_token,
                            },
                            success: (data) => {
                                //Exibe_Animais(data)
                            }
                            
                        })

                        //limpar tela
                        $('#codigo').val("");
                        $('#nome').val("");
                        $('#data_selecionada').val("");
                        document.getElementById('exibe_animais').remove();
                        var novodiv = document.createElement("div");
                        novodiv.id = "exibe_animais";
                        var pesquisa = document.querySelector("#animais");
                        pesquisa.appendChild(novodiv);
                        Swal.fire({
                            icon: "success",
                            title: "Dados Gravados com sucesso!",
                            showConfirmButton: false,
                            timer: 1500
                          });

                    
                    }
                  });

            }else{
                Swal.fire({
                    icon: "error",
                    title: "Não foram selecionados os animais!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }


        }
    }
 
}

document.addEventListener('DOMContentLoaded', function(){ 
    //$('#myTable').DataTable();
    //alert("Carregado")
    busca_valores();
    $('#tabela_usuarios').DataTable({
        language: {
            url: '/static/dataTables/plug-ins/pt-BR.json',
        },
        "bFilter": false,
        'columnDefs': [{'width': '20%', 'targets': [2]}],
    });


}, false );


function busca_valores(){
    $.ajax({
        type:'GET',
        url:'/cadastro/obter_valores',
        //headers:{'X-CSRFToken':csrf_token},
        data:{
  
        },
        success: (data) => {
            atualiza_percent(data);
        }
        
    });
}

function atualiza_percent(data){
   
    document.getElementById("percent").remove();
    var novodiv = document.createElement("div");
    novodiv.id = "percent";
    var pesquisa = document.querySelector("#total");
    pesquisa.appendChild(novodiv);
    

    referencia = data['referencia']
    total = data['valor_total']
    if (referencia !== 0 && total !==0){
        percentual = ((total / referencia) * 100).toFixed(2);
    }else{
        percentual = 0
    }
    if (percentual <50){
        document.getElementById("total").style.backgroundColor = "#008F7A";
    }else if (percentual >= 50 && percentual < 75){
        document.getElementById("total").style.backgroundColor = "#FFC75F";
    }else if(percentual >= 75){
        document.getElementById("total").style.backgroundColor = "red";
    };
    console.log(referencia, total, percentual)
    percent = document.querySelector("#percent");
    percent.insertAdjacentHTML("afterbegin",percentual,);
    
}document.getElementById('botao_pesquisar').addEventListener('click', function(event){
    // alert("Cheguei na pesquisa")
    // ObterDados('');
    ObterAgendamentos();
})

document.getElementById('pesquisa_agendamento').addEventListener('submit', function(event){
    event.preventDefault();
    dados = document.getElementById('input_pesquisa_nome').value;
    console.log(dados)
    ObterAgendamentos(dados);
})


function ObterAgendamentos(dados) {
    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    $.ajax({
        type:'POST',
        url:'exibe_agendamentos',
        headers:{'X-CSRFToken':csrf_token},
        data:{
            pesquisa_nome: dados,
            csrfmiddlewaretoken: csrf_token,
        },
        success: (data) => {
            displayAgendamentos(data)
            console.log(data)
        }
        
    })
}

function displayAgendamentos(data) {
    document.getElementById('exibe_agendamentos').remove();
    var novodiv = document.createElement("div");
    novodiv.id = "exibe_agendamentos";
    var pesquisa = document.querySelector("#pesquisa");
    pesquisa.appendChild(novodiv);
    const codigo = ' <table id = "tabela_agendamentos" class="table table-hover">'
        +'<thead>'
        +'<tr>'
        +'<th scope="col">#</th>'
        +'<th scope="col">CPF</th>'
        +'<th scope="col">Nome</th>'
        +'<th scope="col">Data Agendamento</th>'
        +'<th scope="col"></th>'
        +'<th scope="col"></th>'
        +'</tr>'
        +'</thead>'
        +'<tbody id="dados_agendamentos">'
        
    document.getElementById('exibe_agendamentos').innerHTML += codigo;
    for(i=0; i<data['dados'].length; i++){
        //nomes =  data['dados'][i]['nomes_animais'];
        //console.log(typeof(nomes));
        
        $('#tabela_agendamentos').append('<tr id="user-' + data['dados'][i]['id_usuario'] + '"><td class="userData" id="user-id-' + data['dados'][i]['id_usuario'] + '" name="user-id">' + data['dados'][i]['id_usuario'] + '</td>'
                                    +'<td class="userData" id="user-cpf-' + data['dados'][i]['id_usuario'] + '" name="user-cpf">' + data['dados'][i]['cpf'] + '</td>'
                                    +'<td class="userData" id="user-nome-' + data['dados'][i]['id_usuario'] + '"name="user-nome">' + data['dados'][i]['nome'] + '</td>'
                                    +'<td class="userData" id="user-agendamento-' + data['dados'][i]['id_usuario'] + '"name="user-agendamento">' + data['dados'][i]['data_agendamento'] + '</td>'
                                    +'<td><button class="btn btn-secondary w-100 py-1" onclick="VisualizaAnimal('+data['dados'][i]['id_agendamento']+')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">'
                                    +'<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>'
                                    +'<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>'
                                    +'</svg> Visualizar</button></td>'
                                    +'<td><button class="btn btn-secondary w-100 py-1" onclick="ExcluiAgendamento('+data['dados'][i]['id_agendamento']+')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">'
                                    +'<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>'
                                    +'</svg> Excluir</button></td>'
                                    )
    }
    $('#tabela_agendamentos').DataTable({
        language: {
            url: '/static/dataTables/plug-ins/pt-BR.json',
            
        },
        
        "bFilter": false,
    });
}

function VisualizaAnimal(id){
    console.log(id)
    $.ajax({
        type:'GET',
        url:'exibe_animais/'+id,
        //headers:{'X-CSRFToken':csrf_token},
        data:{
  
        },
        success: (data) => {
            exibeModalAnimais(data);
        }
        
    });
    
}

function exibeModalAnimais(data){
    document.getElementById('tabela_exibe_animais').remove();
    var novodiv = document.createElement("div");
    novodiv.id = "tabela_exibe_animais";
    var pesquisa = document.querySelector("#exibe_animais_modal");
    pesquisa.appendChild(novodiv);

    const codigo =' <table id = "tabela_animais_agendamentos" class="table table-hover">'
    +'<thead>'
    +'<tr>'
    +'<th scope="col">#</th>'
    +'<th scope="col">Nome</th>'
    +'</tr>'
    +'</thead>'
    +'<tbody id="dados_animais_agendamentos">'
    document.getElementById('tabela_exibe_animais').innerHTML += codigo;
    for(i=0; i<data['ids'].length; i++){
        //nomes =  data['dados'][i]['nomes_animais'];
        //console.log(typeof(nomes));
        
        $('#tabela_animais_agendamentos').append('<tr id="user-' + data['ids'][i]['ids'] + '"><td class="userData" id="user-id-' + data['ids'][i]['ids'] + '" name="user-id">' + data['ids'][i]['ids'] + '</td>'
                                    +'<td class="userData" id="user-cpf-' + data['nomes'][i]['nomes'] + '" name="user-cpf">' + data['nomes'][i]['nomes'] + '</td>'
                                    )
    }
    $('#tabela_animais_agendamentos').DataTable({
        language: {
            url: '/static/dataTables/plug-ins/pt-BR.json',
            
        },
        "bPaginate": false,
        "bFilter": false,
    });
    $('#ModalAgendamentos').modal('show')
  

}

function ExcluiAgendamento(id){
    console.log(id)
    $.ajax({
        type:'GET',
        url:'exclui_agendamentos/'+id,
        //headers:{'X-CSRFToken':csrf_token},
        data:{
  
        },
        success: (data) => {
            dados = document.getElementById('input_pesquisa_nome').value;
            ObterAgendamentos(dados);
        }
        
    });
}