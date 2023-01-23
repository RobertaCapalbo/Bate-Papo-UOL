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
    entrar();
    setInterval(function (){
        manterConexão()
    },5000)
    buscarMensagens();
    setInterval(function(){
        buscarMensagens()
    },3000)
    buscarParticipantes()
    setInterval(function(){
        buscarParticipantes()
    },10000)
    informacaoMensagem()
}

function nãoEntrou(resposta){
    if (resposta.response.status === 400){
    alert('Poxa, o nome já escolhido já existe. Tente novamente com outro!')
    } else {
        alert ('Poxa, não foi possível entrar na sala. Tente novamente!')
    }
    window.location.reload()
}

// API para manter a conexão:

function manterConexão(){

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeParticipante);
    promise.catch(nãoConectado);
}
function nãoConectado(erro){
    console.log('Poxa, não foi possível conectar. Tente novamente!');
}

// API para buscar mensagem no servidor:

function buscarMensagens(){

    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(encontrou);
    promise.catch(nãoEncontrou);

}

function encontrou(resposta){
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
    chat.innerHTML = chat.innerHTML + '<div class="reservadamente" data-test="message"><span>('+tempo+')</span> <b>'+remetente+'</b> reservadamente para <b>'+para+'</b>: '+mensagem+'</div>';
    }
    if (tipo === 'status'){
        chat.innerHTML = chat.innerHTML + '<div class="status" data-test="message"><span>('+tempo+')</span>  <b>'+remetente+'</b>  '+mensagem+'</div>'
    }
    if (tipo === 'message'){
        chat.innerHTML = chat.innerHTML + '<div class="publico" data-test="message"><span>('+tempo+')</span> <b>'+remetente+'</b> para <b>'+para+'</b>:  '+mensagem+'</div>'
    }
    }
    const ultimoElemento = chat.lastChild;
    ultimoElemento.scrollIntoView();
}

function nãoEncontrou(erro){
    console.log('Poxa, não foi possível encontrar as mensagens. Tente novamente!');
}

// API para enviar mensagens:

function enviarMensagens(){
    let mensagemModelo = {
        from: nomeParticipante.name,
        to: destinatarioSelecionado,
        text: document.querySelector('.mensagem').value,
        type: tipoMensagem
    };
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagemModelo);
    promise.then(enviou);
    promise.catch(nãoEnviou);
    document.querySelector('.mensagem').value = '';
}
    let input = document.querySelector('.mensagem');
    input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
    event.preventDefault();
    enviarMensagens();
    }
})

function enviou(resposta){
    buscarMensagens()
}

function nãoEnviou(erro){
    console.log('Poxa, não foi possível enviar a sua mensagem. Tente novamente!');
    alert('Você foi desconectado. Entre novamente!');
    window.location.reload();
}

// API para buscar a lista de participantes:

function buscarParticipantes(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(encontrouParticipantes);
    promise.catch(nãoEncontrouParticipantes);
}

function encontrouParticipantes(resposta){
    let arrayParticipantes = resposta.data
    let nomesParticipantes = document.querySelector('ul').innerHTML;
    document.querySelector('ul').innerHTML = '';
    if (destinatarioSelecionado === 'Todos'){
        document.querySelector('ul').innerHTML = `<li class="ion selecionado all" onclick="destinatario(this)" data-test="all">
        <ion-icon name="people"></ion-icon>
        <p class="todos pessoa">Todos</p>
        <div class="check">
        <ion-icon name="checkmark-outline"></ion-icon>
        </div>
    </li>`
    } else {
        document.querySelector('ul').innerHTML = `<li class="ion all" onclick="destinatario(this)" data-test="all">
        <ion-icon name="people"></ion-icon>
        <p class="todos pessoa">Todos</p>
        <div class="check">
        <ion-icon name="checkmark-outline"></ion-icon>
        </div>
    </li>`
    }
    for(let i=0; i < arrayParticipantes.length; i++){
    const nome = arrayParticipantes[i].name;
    if (nome === destinatarioSelecionado){
        document.querySelector('ul').innerHTML += `<li class="lista selecionado" onclick="destinatario(this)" data-test="participant">
        <ion-icon name="person-circle-outline"></ion-icon>
        <div class="pessoa">${nome}</div>
        <div class="check"><ion-icon name="checkmark-outline" data-test="check"></ion-icon></div>
        </li>` 
    } else {
        document.querySelector('ul').innerHTML += `<li class="lista" onclick="destinatario(this)" data-test="participant">
    <ion-icon name="person-circle-outline"></ion-icon>
    <div class="pessoa">${nome}</div>
    <div class="check"><ion-icon name="checkmark-outline" data-test="check"></ion-icon></div>
    </li>`
    }
    }
    if (document.querySelector('.primeira-metade').querySelector('.selecionado')===null){
        document.querySelector('.all').classList.add('selecionado');
        destinatarioSelecionado = 'Todos';
        informacaoMensagem()
    } 
}

function nãoEncontrouParticipantes(erro){
    console.log('Poxa, não foi possível encontrar os participantes. Tente novamente!');
}

// função selecionar destinatário
let destinatarioSelecionado = 'Todos';
function destinatario(destinatarioThis){
    const destinatarioAntes = document.querySelector('.primeira-metade').querySelector('.selecionado');
    if(destinatarioThis.querySelector('.pessoa').innerHTML === nomeParticipante.name){
      return;
    }
    if (destinatarioThis.querySelector('.pessoa').innerHTML === 'Todos'){
      destinatarioAntes.classList.remove('selecionado');
      document.querySelector('.all').classList.add('selecionado');
      destinatarioSelecionado = 'Todos';
    } else if (destinatarioThis.querySelector('.pessoa').innerHTML !== destinatarioSelecionado){
    destinatarioAntes.classList.remove('selecionado');
    destinatarioThis.classList.add('selecionado');
    destinatarioSelecionado = destinatarioThis.querySelector('.pessoa').innerHTML;
 }
 informacaoMensagem()
}

// função selecionar reservadamente ou público
let tipoMensagem = 'message';
function selecionar(selecionarThis){
    const selecionados = document.querySelector('.segunda-metade .selecionado');
    selecionados.classList.remove('selecionado');
    selecionarThis.classList.add('selecionado');
    if(selecionarThis.querySelector('p').innerHTML === 'Público'){
      tipoMensagem = 'message';
    } else {
        tipoMensagem = 'private_message';
    }
    informacaoMensagem()
}

// função para descrição da mensagem 
function informacaoMensagem(){
    if(tipoMensagem === 'message'){
    document.querySelector('.informacaoMensagem').innerHTML = "Enviando para "+ destinatarioSelecionado;
} else {document.querySelector('.informacaoMensagem').innerHTML = "Enviando para "+ destinatarioSelecionado+" (reservadamente)";
}
}