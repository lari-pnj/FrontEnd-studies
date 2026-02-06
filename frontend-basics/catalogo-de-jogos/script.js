let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("#campo-busca");
let dados = [];

async function iniciarBuscas(){
    if (dados.length === 0){
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
            return;
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const resultadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descrição.toLowerCase().includes(termoBusca)
    );
    
    cardContainer.innerHTML = '';
    renderizarCard(resultadosFiltrados);
}

function renderizarCard(dados){
    for (let dado of dados){
        let article = document.createElement("article");
        article.classList.add("card");
        
        let img = document.createElement("img");
        img.src = dado.imagem || 'https://via.placeholder.com/300x400?text=Sem+Imagem';
        img.alt = dado.nome;
        img.className = 'card-img';
        
        let div = document.createElement("div");
        div.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.data}</p>
        <p>${dado.descrição}</p>
        <a href="${dado.link}" target="_blank">Saiba Mais!</a>`;
        
        article.appendChild(img);
        article.appendChild(div);
        cardContainer.appendChild(article);
    }
}

// Inicializa: carrega e mostra todos os jogos ao abrir, e conecta busca em tempo real
document.addEventListener('DOMContentLoaded', () => {
    iniciarBuscas();
    if (campoBusca) {
        campoBusca.addEventListener('input', iniciarBuscas);
        campoBusca.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') iniciarBuscas();
        });
    }
});