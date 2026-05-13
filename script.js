let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];  // cria um array para armazenar as tarefas //00000000000

const form = document.getElementById("form-tarefa");   // acessa os elementos do HTML para manipulá-los //
const lista = document.getElementById("lista-tarefas");

function salvar() {       // salva as tarefas no navegador //
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizar() {   // atualiza a tela mostrando as tarefas cadastradas //
    lista.innerHTML = "";  // limpa a lista antes de renderizar novamente para evitar duplicações //

    tarefas.forEach((tarefa, index) => { // Percorre todas as tarefas do array //
        const li = document.createElement("li"); // Cria dinamicamente um item da lista HTML //

        li.innerHTML = `                           // Insere o conteúdo HTML dentro da tarefa //
            <strong>${tarefa.titulo}</strong><br> 
            ${tarefa.descricao}<br>
            Prioridade: ${tarefa.prioridade}<br>
            Status: ${tarefa.concluida ? "✔️ Concluída" : "⏳ Pendente"}<br>

            <button onclick="concluir(${index})">Concluir</button>
            <button onclick="editar(${index})">Editar</button>
            <button onclick="remover(${index})">Excluir</button>
        `;

        lista.appendChild(li);
    });
}

form.addEventListener("submit", function(e) {  // detecta quando o usuário envia o formulário //
    e.preventDefault();  // impede que a página recarregue ao enviar o formulário // 

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const prioridade = document.getElementById("prioridade").value;

    tarefas.push({  // adiciona uma nova tarefa no array // 
        titulo,
        descricao,
        prioridade,
        concluida: false
    });

    salvar();
    renderizar();
    form.reset();
});

function remover(index) { 
    tarefas.splice(index, 1);    // remove uma tarefa específica do array //
    salvar();
    renderizar();
}

function concluir(index) {
    tarefas[index].concluida = true;   // altera o status da tarefa para concluída //
    salvar();
    renderizar();
}

function editar(index) {   // remover elementos de um array //
    document.getElementById("titulo").value = tarefas[index].titulo;
    document.getElementById("descricao").value = tarefas[index].descricao;
    document.getElementById("prioridade").value = tarefas[index].prioridade;
    tarefas.splice(index, 1);     // splice() método para remover, adicionar e substituir. // remover elementos de um array //
    salvar();
    renderizar();
}

renderizar();