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


function ObterDados() {
    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    dados = $("#pesquisa_nome").val();
    console.log(dados)
    $.ajax({
        type:'POST',
        url:'seleciona_dados',
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
    alert("Cheguei aqui!")
}

function SelectUser(id){
    alert("Usuario Selecionado!")
}