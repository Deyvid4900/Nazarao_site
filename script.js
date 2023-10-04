
//efeito width no objeto selecionado
const listas = document.querySelectorAll('.list-one a')

function selectLista(lista){
    const url = location.href
    const href = lista.href
    

    if(url.includes(href)){
        lista.classList.add('ativo')
        
    }
}


listas.forEach(selectLista)