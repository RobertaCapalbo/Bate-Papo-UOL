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
let nomeParticipante = '';
function entrarNaSala(){
    nomeParticipante = { name: document.querySelector('.nome').value};
    console.log(nomeParticipante);
    carregarLoading();
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeParticipante );
    promise.then(entrou);
    promise.catch(nãoEntrou);

}

function carregarLoading(){
    const divEntrar = document.querySelector('.nomeEBotao');
    divEntrar.innerHTML = '<img class="loading" src="Imagens/loading.gif" alt="loading" />';
    divEntrar.classList.add('margin');
}

function entrou(resposta){
    console.log('Você entrou na sala. Seja bem-vindo(a)!');
    console.log(resposta);
    entrar();
    setInterval(function (){
        manterConexão()
    },5000)
    buscarMensagens();
    setInterval(function(){
        buscarMensagens()
    },3000)
}

function nãoEntrou(resposta){
    if (resposta.response.status === 400){
    alert('Poxa, o nome já escolhido já existe. Tente novamente com outro!')
    } else {
        alert ('Poxa, não foi possível entrar na sala. Tente novamente!')
    }
}

// API para manter a conexão:

function manterConexão(){

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeParticipante);
    promise.catch(nãoConectado);
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
    console.log(resposta.data);
    const arrayMensagem = resposta.data;
    const chat = document.querySelector('.chat');
    chat.innerHTML = '';
    for(let i=0; i<arrayMensagem.length; i++){
    const remetente = arrayMensagem[i].from;
    const mensagem = arrayMensagem[i].text;
    const tempo = arrayMensagem[i].time;
    const para = arrayMensagem[i].to;
    const tipo = arrayMensagem[i].type;
    const resultadoCondicional = para === nomeParticipante.name || remetente === nomeParticipante.name
    if (tipo === 'private_message' && resultadoCondicional) {
    chat.innerHTML = chat.innerHTML + '<div class="reservadamente"><span>('+tempo+')</span> <b>'+remetente+'</b> reservadamente para <b>'+para+'</b>: '+mensagem+'</div>';
    }
    if (tipo === 'status'){
        chat.innerHTML = chat.innerHTML + '<div class="status"><span>('+tempo+')</span>  <b>'+remetente+'</b>  '+mensagem+'</div>'
    }
    if (tipo === 'message'){
        chat.innerHTML = chat.innerHTML + '<div class="publico"><span>('+tempo+')</span> <b>'+remetente+'</b> para <b>'+para+'</b>:  '+mensagem+'</div>'
    }
    }
    const ultimoElemento = chat.lastChild;
    ultimoElemento.scrollIntoView();
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

function buscarParticipantes(){

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