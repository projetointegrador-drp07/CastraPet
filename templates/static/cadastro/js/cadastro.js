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
    box_animal = document.getElementById('form_animal')
    html = "<div class='row'><div class='col-md-8'>Nome do animal:<input type='text' class='form-control' placeholder='Nome do animal' name='nome_animal' value='{{nome_animal}}'><br></div><div class='col-md'>Espécie:<input type='text' class='form-control' placeholder='Espécie' name='especie_animal' value='{{especie_animal}}'><br></div></div><div class='row'><div class='col-md-2'>Idade:<input type='text' class='form-control' placeholder='' name='idade_animal' value='{{idade_animal}}'><br></div><div class='col-md'>Sexo:<input type='text' class='form-control' placeholder='sexo' name='sexo_animal' value='{{sexo_animal}}'><br></div><div class='col-md'>Cor:<input type='text' class='form-control' placeholder='cor' name='cor_animal' value='{{cor_animal}}'><br></div><div class='col-md-1 align-self-center'><button type='button' onclick ='sub_animal()' class='btn btn-secondary w-60 ' alt='Excluir Animal'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-plus-circle-fill' viewBox='0 0 16 16'><path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z'/></svg></button></div></div></div><hr style='background-color:gray;'>"
    box_animal.innerHTML += html
}