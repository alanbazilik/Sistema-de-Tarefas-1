const API_URL = 'http://127.0.0.1:5000/tarefas';

async function carregarTarefas() {
    const response = await fetch(API_URL);
    const tarefas = await response.json();

    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = '';

    tarefas.forEach(tarefa => {
        const div = document.createElement('div');
        div.classList.add('tarefa');
        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>
            <p>${tarefa.descricao}</p>
            <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
            <p><strong>Status:</strong> ${tarefa.status}</p>
            <button onclick="concluirTarefa(${tarefa.id})">Concluir</button>
            <button onclick="removerTarefa(${tarefa.id})">Remover</button>
        `;
        lista.appendChild(div);
    });
}

async function adicionarTarefa(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const prioridade = document.getElementById('prioridade').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descricao, prioridade })
    });

    carregarTarefas();
    event.target.reset();
}

async function concluirTarefa(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Concluída' })
    });

    carregarTarefas();
}

async function removerTarefa(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    carregarTarefas();
}

document.getElementById('novaTarefa').addEventListener('submit', adicionarTarefa);
carregarTarefas();