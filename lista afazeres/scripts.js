document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector(".button-task");
    const input = document.querySelector(".input-task");
    const listacompleta = document.querySelector(".list-task");

    let minhalistadeitens = [];

    // Função para carregar tarefas do localStorage
    function recarregartarefas() {
        const tarefasdolocalstorage = localStorage.getItem("lista");

        if (tarefasdolocalstorage) {
            minhalistadeitens = JSON.parse(tarefasdolocalstorage);
        }
        mostrartarefas();
    }

    function adicionarnnovatarefa() {
        if (input.value.trim() === "") return; // Não adicionar tarefas vazias

        minhalistadeitens.push({
            tarefa: input.value,
            concluida: false
        });

        input.value = ""; // Limpar o campo de input após adicionar

        mostrartarefas();
    }
    
    function mostrartarefas() {
        let novali = ""; // Inicializar a variável novali

        minhalistadeitens.forEach((item, posicao) => {
            novali += `
            <li class="task ${item.concluida ? "done" : ""}">
                <img src="./checked.png" alt="check-na-tarefa" data-index="${posicao}" class="check-task" />
                <p>${item.tarefa}</p>
                <img src="./trash.png" alt="tarefa-para-o-lixo" data-index="${posicao}" class="delete-task" />
            </li>
            `;
        });

        listacompleta.innerHTML = novali;

        // Armazenar a lista atualizada no localStorage
        localStorage.setItem("lista", JSON.stringify(minhalistadeitens));

        // Adiciona o listener para os ícones de concluir tarefas
        document.querySelectorAll('.task .check-task').forEach(img => {
            img.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                concluirtarefa(index);
            });
        });

        // Adiciona o listener para os ícones de deletar após atualizar a lista
        document.querySelectorAll('.task .delete-task').forEach(img => {
            img.addEventListener('click', deletarItem);
        });
    }

    function concluirtarefa(posicao) {
        minhalistadeitens[posicao].concluida = !minhalistadeitens[posicao].concluida;
        mostrartarefas();
    }

    function deletarItem(event) {
        const index = event.target.getAttribute('data-index'); // Corrigido para data-index
        minhalistadeitens.splice(index, 1); // Remove o item da lista
        mostrartarefas(); // Atualiza a lista de tarefas
    }

    // Carregar tarefas do localStorage ao iniciar
    recarregartarefas();

    button.addEventListener('click', adicionarnnovatarefa);
});