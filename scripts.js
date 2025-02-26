const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
})

function lerConteudoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({url: leitor.result, nome: arquivo.name});
    }
    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo ${arquivo.name}`);
    }

    leitor.readAsDataURL(arquivo)
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const imagemTexto = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (event) => {
    event.preventDefault();
    const arquivo = event.target.files[0];

    if(arquivo) {
      try {
        const conteudo = await lerConteudoArquivo(arquivo);
        imagemPrincipal.src = conteudo.url;
        imagemTexto.textContent = conteudo.nome
      } catch (err) {
        console.error("Erro na letura do arquivo")
      }
    } 
})