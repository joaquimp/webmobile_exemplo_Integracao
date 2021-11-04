window.onload = function() {
  buscarTarefas();
}

function mostrarTarefas(tarefas) {
  let div = document.getElementById('tarefas');

  for(let i = 0; i < tarefas.length; i++) {
    let tarefa = tarefas[i];
    let html = `<div id="${tarefa._id}">`;
                  // <div id="w398434jwoiwhro">
    html += `<input type="checkbox" ${tarefa.executada ? "checked" : ""}>`;
                  // <input type="checkbox" checked> 
                  // ou 
                  // <input type="checkbox">
    html += `</input>${tarefa.titulo}</div>`;
                  // </input>Titulo da Tarefa</div>
    div.innerHTML += html;
  }
}

function buscarTarefas() {
  var xhr = new XMLHttpRequest(); 
  xhr.open('GET', '/api/tarefas', true); 
  xhr.responseType = 'json'; 
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Dados recebidos com sucesso!'); 
      mostrarTarefas(xhr.response);
      // console.log(xhr.response);
    } else {
      alert('Problema ao conectar com a API: ' + xhr.status);
    } 
  }
  xhr.send(); 
}





function mudarTarefa(id, novoValor) {
  let dados = JSON.stringify({
    executada: novoValor
  });
  let url = '/api/tarefas/' + id;
  
  var xhr = new XMLHttpRequest(); 
  xhr.open('PATCH', url, true); 
  xhr.responseType = 'json'; 
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Tarefa alterada!'); 
    } else {
      alert('Problema ao alterar a tarefa: ' + xhr.status);
      document.getElementById(id).checked = !novoValor
    } 
  }
  xhr.send(dados); 
}