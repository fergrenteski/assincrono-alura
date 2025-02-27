const listaProjetosFeed = JSON.parse(sessionStorage.getItem("projetos")) || [];
const listaPostFeed = document.getElementById("feed-post-lista");

function atualizarListaPost() {
  listaPostFeed.innerHTML = "";
  if(listaProjetosFeed.length == 0) {
    listaPostFeed.innerHTML = "<span> Nenhum Projeto </span>";
  }
  listaProjetosFeed.forEach((projeto, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="feed-post">
          <div class="feed-imagem">
          <button class="botao-deletar" data-index="${index}">Deletar</button>
              <img src="${projeto.imagem}" alt="${projeto.nome}">
          </div>
          <div class="feed-conteudo">
              <ul class="feed-tags">
                ${projeto.tags.map(tag => `<li>${tag}</li>`).join("")}
              </ul>
              <h3>${projeto.nome}</h3>
              <p>${projeto.descricao}</p>
          </div>
      </div>
    `;
    listaPostFeed.appendChild(li);
  });
  adicionarEventosDeletar();
}

function adicionarEventosDeletar() {
  document.querySelectorAll(".botao-deletar").forEach(botao => {
    botao.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      listaProjetosFeed.splice(index, 1);
      sessionStorage.setItem("projetos", JSON.stringify(listaProjetosFeed));
      atualizarListaPost();
    });
  });
}



atualizarListaPost()