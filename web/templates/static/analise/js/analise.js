function busca_valores(){
    $.ajax({
        type:'GET',
        url:'/cadastro/obter_valores',
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

function desabilita_mes(){
    var check = document.getElementById('checkbox');
    if (check.checked == true){
        document.getElementById('mes').disabled = true;
        //var ano = document.getElementById('ano').value;
        const mes = 13
        atualiza_dashboard($('#ano option:selected').val(),mes);
    }else{
        document.getElementById('mes').disabled = false;
        atualiza_dashboard($('#ano option:selected').val(),$('#mes option:selected').val());
    };
}

document.addEventListener("DOMContentLoaded", () => {
    $(document).ready(function() {
        busca_valores();
        
        $('#ano').change(function(){
            ano_selecionado = $('#ano option:selected').val();
            $.ajax({
                type:'GET',
                url:'/analise/seleciona_ano_mes?ano='+ano_selecionado,
                data:{
          
                },
                success: (data) => {
                    atualiza_select(data);
                    var check = document.getElementById('checkbox');
                    if (check.checked == true){
                        const mes = 13
                        atualiza_dashboard($('#ano option:selected').val(),mes);
                    }else{
                        atualiza_dashboard($('#ano option:selected').val(),data['meses'][0]);
                    }
                }
                
            });
            
        });
        //atualizar valores depois que tem alteração no mes
        $('#mes').change(function(){
            //console.log($('#mes').val())
            atualiza_dashboard($('#ano option:selected').val(),$('#mes option:selected').val());
        });
        atualiza_dashboard($('#ano option:selected').val(),$('#mes option:selected').val());
    });

  });

function atualiza_select(data){
    //atualiza_percent(data);
    console.log('ano_selecionado:'+data['meses'])
    const selectElement = document.getElementById('mes');
    //const select = document.getElementById("mySelect");
    selectElement.innerHTML='';
    for (let i = 0; i < selectElement.options.length; i++) {
        selectElement.remove(i);
        
    }
    var meses = new Array(12);
        meses[0] = "Janeiro";
        meses[1] = "Fevereiro";
        meses[2] = "Março";
        meses[3] = "Abril"; 
        meses[4] = "Maio";
        meses[5] = "Junho";
        meses[6] = "Julho";
        meses[7] = "Agosto";
        meses[8] = "Setembro";
        meses[9] = "Outubro";
        meses[10] = "Novembro";
        meses[11] = "Dezembro";

    for(i=0;i<data['meses'].length; i++){
        if (data['meses'][i] === 1){
            var elem = "<option value='"+data['meses'][i]+"'>"+meses[0]+"</option>";
            $('#mes').append(elem);
        }else if (data['meses'][i] === 2){
            var elem = "<option value='"+data['meses'][i]+"'>"+meses[1]+"</option>";
            $('#mes').append(elem);
        }else if (data['meses'][i] === 3){
            var elem = "<option value='"+data['meses'][i]+"'>"+meses[2]+"</option>";
            $('#mes').append(elem);
        }else if (data['meses'][i] === 4){
            var elem = "<option value='"+data['meses'][i]+"'>"+meses[3]+"</option>";
            $('#mes').append(elem);
        }else if (data['meses'][i] === 5){
            var elem = "<option value='"+data['meses'][i]+"'>"+meses[4]+"</option>";
            $('#mes').append(elem);
        }else if (data['meses'][i] === 6){
            var elem = "<option value='"+data['meses'][i]+"'>"+meses[5]+"</option>";
            $('#mes').append(elem);
        }else if (data['meses'][i] === 7){
            var elem = "<option value='"+data['meses'][i]+"'>"+meses[6]+"</option>";
            $('#mes').append(elem);
        }else if (data['meses'][i] === 8){
            var elem = "<option value='"+data['meses'][i]+"'>"+meses[7]+"</option>";
            $('#mes').append(elem);
        }else if (data['meses'][i] === 9){
            var elem = "<option value='"+data['meses'][i]+"'>"+meses[8]+"</option>";
            $('#mes').append(elem);
        }else if (data['meses'][i] === 10){
            var elem = "<option value='"+data['meses'][i]+"'>"+meses[9]+"</option>";
            $('#mes').append(elem);
        }else if (data['meses'][i] === 11){
            var elem = "<option value='"+data['meses'][i]+"'>"+meses[10]+"</option>";
            $('#mes').append(elem);
        }else if (data['meses'][i] === 12){
            var elem = "<option value='"+data['meses'][i]+"'>"+meses[11]+"</option>";
            $('#mes').append(elem);
        }

    }

  }


function atualiza_dashboard(ano, mes){
    console.log(ano, mes)

    //atualiza total de cadastros
    document.getElementById("contador").remove();
    var novodiv = document.createElement("div");
    novodiv.id = "contador";
    var pesquisa = document.querySelector("#dados_total_cadastros_mes");
    pesquisa.appendChild(novodiv);

    //atualiza total em reais
    document.getElementById("somador").remove();
    var novodiv = document.createElement("div");
    novodiv.id = "somador";
    var pesquisa = document.querySelector("#dados_valor_cadastros_mes");
    pesquisa.appendChild(novodiv);

    //atualiza percentuais
    document.getElementById("porcentagem").remove();
    var novodiv = document.createElement("div");
    novodiv.id = "porcentagem";
    var pesquisa = document.querySelector("#dados_percentual_cadastros_mes");
    pesquisa.appendChild(novodiv);

    $.ajax({
        type:'GET',
        url:'exibe_dados?ano='+ano+'&mes='+mes+'',
        data:{
  
        },
        success: (data) => {
            //console.log(data['total_cadastros']);
            cadastros = data['total_cadastros'];
            div = document.querySelector("#contador");
            div.insertAdjacentHTML("afterbegin",cadastros,);
            valores = data['valor_total_animais'];
            div = document.querySelector("#somador");
            div.insertAdjacentHTML("afterbegin",valores,);
            percentual = data['percentual'];
            div = document.querySelector("#porcentagem");
            div.insertAdjacentHTML("afterbegin",percentual,);
            gera_grafico_animais(data);
            gera_grafico_bairros(data);
            gera_grafico_agendamentos(data);
        }
        
    });
}

function gera_grafico_animais(data){
    //grafico animais
    document.getElementById("g_animais").remove();
    var novodiv = document.createElement("div");
    novodiv.id = "g_animais";
    var pesquisa = document.querySelector("#graficos_animais");
    pesquisa.appendChild(novodiv);
    codigo = '<canvas id="animais"></canvas>';
    document.getElementById('g_animais').innerHTML += codigo;

    const ctx = document.getElementById("animais").getContext("2d");
    // ctx.destroy()
    const myChart = new Chart(ctx,{
        type:'bar',
        data:{
            labels:['Canino/Fêmea','Canino/Macho','Felino/Fêmea','Felino/Macho'],
            datasets:[{
                label: 'Total de animais cadastrados:'+data['total_animais'],
                data:[data['qtde_canino_femea'],data['qtde_canino_macho'],data['qtde_felino_femea'],data['qtde_felino_macho']],
                backgroundColor:[
                    'rgba(255, 99, 132,0.6)',
                    'rgba(75, 192, 192,0.6)',
                    'rgba(255, 205, 86,0.6)',
                    'rgba(201, 203, 207,0.6)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                  ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
          }
    });
}

function gera_grafico_bairros(data){
        //grafico bairros
        document.getElementById("g_bairros").remove();
        var novodiv = document.createElement("div");
        novodiv.id = "g_bairros";
        var pesquisa = document.querySelector("#grafico_bairros");
        pesquisa.appendChild(novodiv);
        codigo = '<canvas id="bairros"></canvas>';
        document.getElementById('g_bairros').innerHTML += codigo;
        console.log(data['bairros'][0])
        console.log(data['qtde_bairros'][0])
        const ctx1 = document.getElementById("bairros").getContext("2d");
        // ctx.destroy()
        const myChart1 = new Chart(ctx1,{
            type:'bar',
            data:{
                labels:[data['bairros'][0],data['bairros'][1],data['bairros'][2],data['bairros'][3],data['bairros'][4]],
                datasets:[{
                    label: 'Distribuição por Bairros (Top 5)',
                    data:[data['qtde_bairros'][0],data['qtde_bairros'][1],data['qtde_bairros'][2],data['qtde_bairros'][3],data['qtde_bairros'][4]],
                    backgroundColor:[
                        'rgba(255, 99, 132,0.6)',
                        'rgba(75, 192, 192,0.6)',
                        'rgba(255, 205, 86,0.6)',
                        'rgba(201, 203, 207,0.6)',
                        'rgba(153, 102, 255, 0.6)',
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 205, 86)',
                        'rgb(201, 203, 207)',
                        'rgb(153, 102, 255)',
                      ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
              }
        });
}

function gera_grafico_agendamentos(data){
            //grafico agendamentos
            document.getElementById("g_agendamentos").remove();
            var novodiv = document.createElement("div");
            novodiv.id = "g_agendamentos";
            var pesquisa = document.querySelector("#grafico_agendamentos");
            pesquisa.appendChild(novodiv);
            codigo = '<canvas id="agendamentos"></canvas>';
            document.getElementById('g_agendamentos').innerHTML += codigo;
            const ctx2 = document.getElementById("agendamentos").getContext("2d");
            console.log('agendamentos:'+data['agendamentos'])
            console.log('falta agendar:'+data['falta_agendar'])
            const myChart2 = new Chart(ctx2,{
                type:'pie',
                data:{
                    labels: [
                        'Agendados',
                        'Faltam Agendar',
                        
                    ],
                    datasets: [{
                        //label: 'Agendados / Faltam Agendar',
                        data: [data['agendamentos'], data['falta_agendar']],
                        backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
  
                        ],
                        hoverOffset: 4,
                    }],
                }
            });
}