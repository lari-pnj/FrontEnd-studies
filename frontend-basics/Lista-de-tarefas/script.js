let tarefas = []
let filtroAtivo = "todas"

function adicionarTarefas(event) {
    event.preventDefault()
    const inputTarefas = document.getElementById("tarefa-input")
    let tarefa = inputTarefas.value.trim()
    
    if (tarefa === "") {
        alert("Por favor, insira uma tarefa!")
        return
    }
    
    tarefas.push({
        id: Date.now(),
        texto: tarefa,
        completa: false
    })
    
    inputTarefas.value = ""
    renderizarTarefas()
    atualizarProgresso()
}

function renderizarTarefas() {
    const listaTarefas = document.getElementById("tarefas-lista")
    listaTarefas.innerHTML = ""
    
    let tarefasFiltradas = tarefas
    
    if (filtroAtivo === "completas") {
        tarefasFiltradas = tarefas.filter(t => t.completa)
    } else if (filtroAtivo === "pendentes") {
        tarefasFiltradas = tarefas.filter(t => !t.completa)
    }
    
    tarefasFiltradas.forEach(tarefa => {
        const li = document.createElement("li")
        li.className = "tarefa-item"
        
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = tarefa.completa
        checkbox.addEventListener("change", () => {
            tarefa.completa = checkbox.checked
            atualizarProgresso()
            renderizarTarefas()
        })
        
        const span = document.createElement("span")
        span.textContent = tarefa.texto
        span.className = tarefa.completa ? "completa" : ""
        
        const botaoDelete = document.createElement("button")
        botaoDelete.textContent = "Deletar"
        botaoDelete.className = "btn-deletar"
        botaoDelete.addEventListener("click", () => {
            tarefas = tarefas.filter(t => t.id !== tarefa.id)
            atualizarProgresso()
            renderizarTarefas()
        })
        
        li.appendChild(checkbox)
        li.appendChild(span)
        li.appendChild(botaoDelete)
        listaTarefas.appendChild(li)
    })
}

function atualizarProgresso() {
    const total = tarefas.length
    const completas = tarefas.filter(t => t.completa).length
    const percentual = total === 0 ? 0 : Math.round((completas / total) * 100)
    
    const progressBar = document.getElementById("file")
    progressBar.value = percentual
}

function aplicarFiltro(filtro) {
    filtroAtivo = filtro
    document.querySelectorAll(".filtro-item").forEach(btn => {
        btn.classList.remove("ativo")
    })
    event.target.classList.add("ativo")
    renderizarTarefas()
}

// Event Listeners
document.getElementById("form-tarefas").addEventListener("submit", adicionarTarefas)

document.querySelectorAll(".filtro-item").forEach((botao, index) => {
    botao.addEventListener("click", function() {
        const filtros = ["todas", "completas", "pendentes"]
        aplicarFiltro(filtros[index])
    })
})


