const btn_sideBar = document.getElementById("btnHamburger");
const div_sideBar = document.getElementById("sideBar");
const corpo = [...document.getElementsByTagName("body")]



const listas = document.querySelectorAll(".list-one a");

function selectLista(lista) {
  const url = location.href;
  const href = lista.href;

  if (url.includes(href)) {
    lista.classList.add("ativo");
  }
}

listas.forEach(selectLista);

btn_sideBar.addEventListener("click",()=>{
  div_sideBar.removeAttribute("class","sideBarOFF")
  div_sideBar.setAttribute("class","sideBarON")
  btn_sideBar.setAttribute("class","OFF")
  corpo[0].setAttribute("class","estatico")
  

})
div_sideBar.addEventListener("click",()=>{
  div_sideBar.removeAttribute("class","sideBarON")
  div_sideBar.setAttribute("class","sideBarOFF")
  btn_sideBar.removeAttribute("class","OFF")
  btn_sideBar.setAttribute("class","btnHamburger")
  corpo[0].removeAttribute("class","estatico")
  console.log("ok")
})

