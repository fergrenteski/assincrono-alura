const listaProjetos = JSON.parse(sessionStorage.getItem("projetos")) || [];

const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");
const imagemPrincipal = document.querySelector(".main-imagem");
const imagemTexto = document.querySelector(".container-imagem-nome p");
const categoria = document.getElementById("categoria");
const listaTags = document.getElementById("lista-tags");
const publicar = document.querySelector(".botao-publicar");

uploadBtn.addEventListener("click", () => inputUpload.click());

function lerConteudoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => resolve({ url: leitor.result, nome: arquivo.name });
    leitor.onerror = () => reject(`Erro na leitura do arquivo ${arquivo.name}`);
    leitor.readAsDataURL(arquivo);
  });
}

inputUpload.addEventListener("change", async (event) => {
  event.preventDefault();
  const arquivo = event.target.files[0];

  if (arquivo) {
    try {
      const conteudo = await lerConteudoArquivo(arquivo);
      imagemPrincipal.removeAttribute("style");
      imagemPrincipal.src = conteudo.url;
      imagemTexto.textContent = conteudo.nome;
    } catch (err) {
      console.error("Erro na leitura do arquivo");
    }
  }
});

categoria.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const tagTexto = categoria.value.trim();
    if (tagTexto) {
      const novaTag = document.createElement("li");
      novaTag.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
      listaTags.appendChild(novaTag);
      categoria.value = "";
    }
  }
  
});

listaTags.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-tag")) {
    event.target.parentElement.remove();
  }
});

publicar.addEventListener("click", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const tags = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);
  const imagem = imagemPrincipal.src;

  if(tags.length > 4) {
    alert("Existem tags demais para o projeto");
    return;
  }
  if (!nome || !descricao || !imagem) {
    alert("Preencha todos os campos antes de publicar!");
    return;
  }

  const projeto = { nome, descricao, tags, imagem };
  listaProjetos.push(projeto);
  sessionStorage.setItem("projetos", JSON.stringify(listaProjetos));

  listaTags.innerHTML = "";
  document.getElementById("nome").value = "";
  document.getElementById("descricao").value = "";
  imagemPrincipal.src = "";
  imagemTexto.textContent = "";
});


