//efeito width no objeto selecionado
const usuario = document.getElementById("usuario");
const senhaUsuario = document.getElementById("senha");
const btn_form = document.getElementById("btn_Acessar");

const dataDeExpiracao = new Date();
dataDeExpiracao.setDate(dataDeExpiracao.getDate() + 7);

const listas = document.querySelectorAll(".list-one a");

function selectLista(lista) {
  const url = location.href;
  const href = lista.href;

  if (url.includes(href)) {
    lista.classList.add("ativo");
  }
}

listas.forEach(selectLista);

const injetaDados=()=>{
    window.location.href = "http://gruponazarao.lzt.com.br/";
    const inputs = [...document.querySelectorAll["input"]]
    

    inputs[0].value = localStorage.getItem("username");
    inputs[1].value = localStorage.getItem("password");

}

btn_form.addEventListener("click", () => {
  const usernameValue = usuario.value;
  const passwordValue = senhaUsuario.value;

  const dataDeExpiracao = new Date();
  dataDeExpiracao.setDate(dataDeExpiracao.getDate() + 7);

  document.cookie = "username=" + usernameValue + "; expires=" + dataDeExpiracao.toUTCString() + "; path=/";
  document.cookie = "password=" + passwordValue + "; expires=" + dataDeExpiracao.toUTCString() + "; path=/";

  setTimeout(injetaDados,1000)
});
