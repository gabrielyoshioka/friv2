const input = document.querySelector('.login_nome');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_formulario');


const validarInput = ({target}) =>{
    if(target.value.length > 2){
        button.removeAttribute('disabled');
        return;
    }
        button.setAttribute('disabled', '');
}

const infoEnviar = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);
    window.location.href = 'jogoDaMemoria.html';
}

input.addEventListener('input', validarInput);
form.addEventListener('submit', infoEnviar);
