////////////////////////////////
// Faz a busca das tarefas
// somente após carregar todo
// o documento html
////////////////////////////////
window.onload = function() {
  buscarTarefas();
}

// usar a linha a seguir e comentar a próxima se for rodar
// o codigo do front localmente e acessando a API remoto
// do professor
// const BASE_URL = 'https://webmovibile.herokuapp.com/api/tarefas/';
const BASE_URL = '/api/tarefas/'


////////////////////////////////
// Funcao que cria o HTML com
// base nos dados passados,
// uma lista de tarefas contendo
// um 'titulo' e um booleano
// 'executada'
////////////////////////////////
function mostrarTarefas(tarefas) {

  // Pega a referencia do HTML e limpa a lista de tarefas
  let div = document.getElementById('tarefas');
  div.innerHTML = '';

  // Cria cada uma das linhas (tarefa)
  for(let i = 0; i < tarefas.length; i++) {
    let tarefa = tarefas[i];
    let html = `<div id="${tarefa._id}" class="tarefa">`;
    html += `<div><input type="checkbox" ${tarefa.executada ? "checked" : ""} onchange="mudarTarefa('${tarefa._id}',${!tarefa.executada})">`;
    html += `</input>${tarefa.titulo}</div>`;
    html += `<div><img src="imagens/edit.png" class="botao" onclick="editarTituloTarefa('${tarefa._id}')" />&nbsp;`;
    html += `<img src="imagens/delete.png" class="botao" onclick="apagarTarefa('${tarefa._id}', '${tarefa.titulo}')"/></div>`;
    html += '</div>'
    
    div.innerHTML += html;
  }
}

////////////////////////////////
// Envia para a API os dados
// de uma nova tarefa e atualiza
// a lista no HTML
////////////////////////////////
function criarTarefa() {
  const titulo = document.getElementById('tarefa-titulo').value.trim();
  if(!titulo || titulo === '') {
    alert('Informe um título para adicionar a tarefa');
    return;
  }

  // Desativa o botao de adicionar ate terminar a acao
  // evitando que o usuario clique muitas vezes seguidas
  document.getElementById('tarefa-titulo').value = '';
  document.getElementById('createButton').disabled = true;

  const dados = {
    titulo: titulo
  };

  var xhr = new XMLHttpRequest(); 
  xhr.open('POST', BASE_URL, true); 
  xhr.responseType = 'json'; 

  // Como estamos enviando dados no formato JSON eh preciso informar
  // no cabecalho http que os dados estao neste formato
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  
  xhr.onload = function () {
    document.getElementById('createButton').disabled = false;
    if (xhr.status >= 200 && xhr.status <= 299) {
      console.log('Tarefa criada com sucesso!'); 
      buscarTarefas();
    } else {
      alert('Problema ao alterar a tarefa: ' + xhr.status);
    } 
  }

  // envia os dados (JSON no formato string)
  xhr.send(JSON.stringify(dados)); 
}


////////////////////////////////
// Busca as tarefas na API
// enviando o resultado para a
// funcao que mostra estes dados
////////////////////////////////
function buscarTarefas() {
  var xhr = new XMLHttpRequest(); 
  xhr.open('GET', BASE_URL, true); 
  xhr.responseType = 'json'; 
  xhr.onload = function () {
    if (xhr.status === 200) { 
      mostrarTarefas(xhr.response);
    } else {
      alert('Problema ao conectar com a API: ' + xhr.status);
    } 
  }
  xhr.send(); 
}


////////////////////////////////
// Metodo usado toda vez que os
// usuario altera o estado de
// uma tarefa (checkbox)
////////////////////////////////
function mudarTarefa(id, novoValor) {
  const dados = {
    executada: novoValor
  };
  const url = BASE_URL + id;

  var xhr = new XMLHttpRequest(); 
  xhr.open('PATCH', url, true); 
  xhr.responseType = 'json'; 
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Tarefa alterada!'); 
    } else {
      alert('Problema ao alterar a tarefa: ' + xhr.status);

      // Caso ocorra algum erro na API eh preciso
      // voltar o valor do checkbox
      document.getElementById(id).checked = !novoValor
    } 
  }

  // envia os dados (JSON no formato string)
  xhr.send(JSON.stringify(dados)); 
}


////////////////////////////////
// Metodo utilizado para mudar
// o titulo de uma tarefa
////////////////////////////////
function editarTituloTarefa(id) {
  // Prompt exibe uma janela com um campo para ser
  // preenchido pelo usuario
  let titulo = prompt('Informe o novo título da tarefa');
  if (!titulo || titulo.trim() === '') return;

  const dados = {
    titulo: titulo
  };
  const url = BASE_URL + id;

  var xhr = new XMLHttpRequest(); 
  xhr.open('PATCH', url, true); 
  xhr.responseType = 'json'; 
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Tarefa alterada!'); 
      buscarTarefas();
    } else {
      alert('Problema ao alterar a tarefa: ' + xhr.status);
      document.getElementById(id).checked = !novoValor
    } 
  }

  // envia os dados (JSON no formato string)
  xhr.send(JSON.stringify(dados));  
}

////////////////////////////////
// Com base no id esta funcao
// solicita a API que apague
// os dados de uma tarefa
////////////////////////////////
function apagarTarefa(id, titulo) {
  // window.confirm exibe uma janela de confirmacao com as opcoes
  // de cancelar e confirmar
  if(!window.confirm(`Deseja realmente apagar a tarefa "${titulo}"?`)) {
    return;
  }
  const url = BASE_URL + id;

  var xhr = new XMLHttpRequest(); 
  xhr.open('DELETE', url, true); 
  xhr.responseType = 'json'; 
  
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Tarefa alterada!'); 
      buscarTarefas();
    } else {
      alert('Problema ao alterar a tarefa: ' + xhr.status);
      document.getElementById(id).checked = !novoValor
    } 
  }

  xhr.send(); 
}
