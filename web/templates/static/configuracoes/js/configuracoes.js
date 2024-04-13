function salvar_empresa(){
    empresa = $('input[id="nome"]').val();
    endereco = $('input[id="endereco"]').val();
    telefone1 = $('input[id="telefone1"]').val();
    telefone2 = $('input[id="telefone2"]').val();
        
    if(empresa==="" || endereco ==="" || telefone1 ===""){
        Swal.fire({
            icon: "error",
            title: "Preencha os campos com os dados da empresa!",
            showConfirmButton: false,
            timer: 1500
          });
    }else{
        Swal.fire({
            title: "Confirma alteração dos dados?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, confirme!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
                $.ajax({
                    type:'POST',
                    url:'config_empresa',
                    headers:{'X-CSRFToken':csrf_token},
                    data:{
                        nome: empresa,
                        endereco: endereco,
                        telefone1:telefone1,
                        telefone2:telefone2,
                        csrfmiddlewaretoken: csrf_token,
                    },

                })
                Swal.fire({
                    icon: "success",
                    title: "Dados gravados com sucesso!",
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        });
    }   
}

function add_medico(){
    medico = $('input[id="medico"]').val();
    crmv = $('input[id="crmv"]').val();
    crmv_uf = document.getElementById('crmv-uf').value;
    console.log(crmv_uf)
            
    if(medico==="" || crmv ==="" || crmv_uf ==="s_opcao"){
        Swal.fire({
            icon: "error",
            title: "Preencha os campos com os dados do profissional!",
            showConfirmButton: false,
            timer: 1500
          });
    }else{
        csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
        $.ajax({
            type:'POST',
            url:'salva_profissionais',
            headers:{'X-CSRFToken':csrf_token},
            data:{
                profissional: medico,
                crmv: crmv,
                uf: crmv_uf,
                csrfmiddlewaretoken: csrf_token,
            },

        })
        Swal.fire({
            icon: "success",
            title: "Dados gravados com sucesso!",
            showConfirmButton: false,
            timer: 1500
        });
        //exibir tabela atualizada
        $('#medico').val("");
        $('#crmv').val("");
        $('#crmv-uf').val("");
        exibir_medico();
    }

}

function remove_medico(id){
    Swal.fire({
        title: "Tem certeza que deseja excluir?",
        text: "Essa ação não pode ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, delete!",
        cancelButtonText: "Cancelar!",
    }).then((result) => {
        if (result.isConfirmed) {
            csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
            $.ajax({
                type:'POST',
                url:'exclui_profissionais/'+id,
                headers:{'X-CSRFToken':csrf_token},
                data:{
                    id: id,
                    csrfmiddlewaretoken: csrf_token,
                },
                success: () => {
                    exibir_medico();
                    Swal.fire({
                        icon: "success",
                        title: "Profissional apagado "+id,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
            
        }
    });
    
}

function exibir_medico(){
    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    //console.log(dados)
    $.ajax({
        type:'POST',
        url:'exibe_profissionais',
        headers:{'X-CSRFToken':csrf_token},
        data:{
            csrfmiddlewaretoken: csrf_token,
        },
        success: (data) => {
            document.getElementById('lista_profissionais').remove();
            var novodiv = document.createElement("div");
            novodiv.id = "lista_profissionais";
            var pesquisa = document.querySelector("#exibe_profissionais");
            pesquisa.appendChild(novodiv);
            const codigo = ' <table id = "tabela_profissionais" class="table table-hover" style="width:100%">'
            +'<thead>'
            +'<tr>'
            +'<th scope="col">#</th>'
            +'<th scope="col">Nome</th>'
            +'<th scope="col">CRMV</th>'
            +'<th scope="col">UF</th>'
            +'</tr>'
            +'</thead>'
            +'<tbody id="dados_usuarios">'
            document.getElementById('lista_profissionais').innerHTML += codigo;
            for(i=0; i<data['dados'].length; i++){
                 $('#tabela_profissionais').append('<tr id="user-' + data['dados'][i]['id'] + '"><td class="userData" id="user-id-' + data['dados'][i]['id'] + '" name="user-id">' + data['dados'][i]['id'] + ''
                 +'<td class="userData" id="user-nome-' + data['dados'][i]['id'] + '"name="user-nome">' + data['dados'][i]['fields']['profissional'] + '</td>'
                 +'<td class="userData" id="user-crmv-' + data['dados'][i]['id'] + '"name="user-crmv">' + data['dados'][i]['fields']['crmv'] + '</td>'
                 +'<td class="userData" id="user-uf-' + data['dados'][i]['id'] + '"name="user-uf">' + data['dados'][i]['fields']['uf'] + '</td>'
                 +'<td class="userData"><button type="button" onclick="remove_medico('+data["dados"][i]["id"]+')" class="btn btn-danger btn-sm btn-remove" alt="Excluir Profissional">Excluir</button></td>'
                 );
            }

        }
        
    });
}

function definir_valores(){
    referencia = $('input[id="referencia"]').val();
    canino_femea = $('input[id="canino_femea"]').val();
    canino_macho = $('input[id="canino_macho"]').val();
    felino_femea = $('input[id="felino_femea"]').val();
    felino_macho = $('input[id="felino_macho"]').val();
    //console.log(referencia, canino_femea, canino_macho, felino_femea, felino_macho)
    if(referencia==="" || canino_femea ==="" || canino_macho ==="" || felino_femea ==="" || felino_macho ===""){
        Swal.fire({
            icon: "error",
            title: "Preencha os campos com valores!",
            showConfirmButton: false,
            timer: 1500
          });
    }else{
        Swal.fire({
            title: "Confirma alteração dos valores?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, confirme!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
                $.ajax({
                    type:'POST',
                    url:'att_valores',
                    headers:{'X-CSRFToken':csrf_token},
                    data:{
                        referencia: referencia,
                        canino_femea: canino_femea,
                        canino_macho:canino_macho,
                        felino_femea:felino_femea,
                        felino_macho:felino_macho,
                        csrfmiddlewaretoken: csrf_token,
                    },

                })
                busca_valores();
                Swal.fire({
                    icon: "success",
                    title: "Dados gravados com sucesso!",
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        });
      
    }
}
document.addEventListener('DOMContentLoaded', function(){ 
    busca_valores()


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
    
}
