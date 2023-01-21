function entrar(){
    const inicio = document.querySelector('.tudo.escondido');
    const telaLogin = document.querySelector('.inicio');
    inicio.classList.remove('escondido');
    telaLogin.classList.add('escondido');
}

function abrir(){
    const inicio2 = document.querySelector('.container.escondido');
    inicio2.classList.remove('escondido');
}

function sair(){
    const inicio2 = document.querySelector('.container');
    inicio2.classList.add('escondido');
}

// API entrar na sala:

function entrarNaSala(){

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(entrou);
    promise.catch(nãoEntrou);

}

function entrou(resposta){
    console.log('Você entrou na sala. Seja bem-vindo(a)!');
    console.log(resposta);
}

function nãoEntrou(erro){
    console.log('Poxa, não foi possível entrar na sala. Tente novamente!');
    console.log(erro);
}

// API para manter a conexão:

setTimeout(function manterConexão(){

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status');
    promise.then(conectado);
    promise.catch(nãoConectado);

}, 5000)

function conectado(resposta){
    console.log('Você está conectado(a)');
    console.log(resposta);
}

function nãoConectado(erro){
    console.log('Poxa, não foi possível conectar. Tente novamente!');
    console.log(erro);
}

// API para buscar mensagem no servidor:

function buscarMensagens(){

    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(encontrou);
    promise.catch(nãoEncontrou);

}

function encontrou(resposta){
    console.log('Mensagens encontradas!');
    console.log(resposta);
}

function nãoEncontrou(erro){
    console.log('Poxa, não foi possível encontrar as mensagens. Tente novamente!');
    console.log(erro);
}

// API para enviar mensagens:

function enviarMensagens(){

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(enviou);
    promise.catch(nãoEnviou);

}

function enviou(resposta){
    console.log('Mensagem enviada!');
    console.log(resposta);
}

function nãoEnviou(erro){
    console.log('Poxa, não foi possível enviar a sua mensagem. Tente novamente!');
    console.log(erro);
}

// API para buscar a lista de participantes:

function buscarMensagens(){

    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(encontrouParticipantes);
    promise.catch(nãoEncontrouParticipantes);

}

function encontrouParticipantes(resposta){
    console.log('Participantes encontrados!');
    console.log(resposta);
}

function nãoEncontrouParticipantes(erro){
    console.log('Poxa, não foi possível encontrar os participantes. Tente novamente!');
    console.log(erro);
}