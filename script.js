let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const form = document.getElementById("form-tarefa");
const lista = document.getElementById("lista-tarefas");

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizar() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${tarefa.titulo}</strong><br>
            ${tarefa.descricao}<br>
            Prioridade: ${tarefa.prioridade}<br>
            Status: ${tarefa.concluida ? "✔️ Concluída" : "⏳ Pendente"}<br>

            <button onclick="concluir(${index})">Concluir</button>
            <button onclick="remover(${index})">Excluir</button>
        `;

        lista.appendChild(li);
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault(); // 🔥 ESSENCIAL

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const prioridade = document.getElementById("prioridade").value;

    tarefas.push({
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
    tarefas.splice(index, 1);
    salvar();
    renderizar();
}

function concluir(index) {
    tarefas[index].concluida = true;
    salvar();
    renderizar();
}

renderizar();