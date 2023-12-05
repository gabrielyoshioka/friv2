const input = document.querySelector('.login_nome'); //recebendo o valor do input
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_formulario');


//funçao verificar se o usuário inseriu um nome válido. O nome deve ter pelo menos 3 caracteres
const validarInput = ({target}) =>{
    if(target.value.length > 2){//percorrer
        button.removeAttribute('disabled'); //remover o atributo
        return;
    }
        button.setAttribute('disabled', ''); //deixar o atibuto
}

//Esta função recebe um objeto de evento como entrada.
const infoEnviar = (event) => {
    event.preventDefault(); //Ela impede o comportamento padrão de envio do formulário usando

    localStorage.setItem('player', input.value);//Ela armazena o valor de entrada no armazenamento local usando
    window.location.href = 'jogoDaMemoria.html';//redireciona para a pagina do jogo
}

//executando as funções
input.addEventListener('input', validarInput);
form.addEventListener('submit', infoEnviar);
