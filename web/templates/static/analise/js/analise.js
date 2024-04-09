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
    percentual = ((total / referencia) * 100).toFixed(2);
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
        var ano =  $("#ano option:selected").val();
        
    }else{
        document.getElementById('mes').disabled = false;
    };
}

document.addEventListener("DOMContentLoaded", () => {
    $(document).ready(function() {
        $('#ano').change(function(){
            //console.log($('#ano option:selected').val());
            
        });
    });

  });