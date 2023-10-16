import { cordsPostos } from "./postos.js";

const CardPosto = document.getElementById("CardPosto")
let pontoMaisProximo = null;
let menorDistancia = Infinity;

const options = {
    enableHighAccuracy: true, // Reduz a precisão
    timeout: 15000, // Tempo limite em milissegundos
    maximumAge: 0 // Não usar cache
};
navigator.geolocation.getCurrentPosition(function (position) {

    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    function calcularDistancia(lat1, lon1, lat2, lon2) {
        const raio = 6371; // Raio médio da Terra em quilômetros

        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distancia = raio * c; // Distância em quilômetros
        return distancia;
    }

    // Iterar sobre os objetos e calcular as distâncias
    cordsPostos.forEach(local => {
        const distancia = calcularDistancia(lat, lng, local.lat, local.lng);
        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            pontoMaisProximo = local;
        }
    });


    console.log("O ponto mais próximo é:", pontoMaisProximo);
    console.log("Distância:", menorDistancia, "quilômetros");
    console.log(lat);
    console.log(lng);

    // Função de comparação para o método sort
    function compararDistancia(a, b) {
        const distanciaA = calcularDistancia(lat, lng, a.lat, a.lng);
        const distanciaB = calcularDistancia(lat, lng, b.lat, b.lng);
        return (distanciaA - distanciaB)
    }

    // Ordene o array com base na distância
    cordsPostos.sort(compararDistancia);
    const postosOrdenados = cordsPostos.map(posto => ({
        ...posto,
        distancia: calcularDistancia(lat, lng, posto.lat, posto.lng)
    })).sort((a, b) => a.distancia - b.distancia);

    console.log("Array ordenado:", postosOrdenados);

    cordsPostos.forEach(element => {
        // Crie um elemento div com a classe "lineInfo"
        var divLineInfo = document.createElement("div");
        divLineInfo.classList.add("lineInfo");

        // Crie um elemento div com a classe "foto"
        var divFoto = document.createElement("div");
        divFoto.classList.add("foto");
        // var foto = document.createElement("img")
        // foto.setAttribute("src",element.img)
        // foto.appendChild(divFoto)

        // Crie um elemento div com a classe "infoPostosPetrobras"
        var divInfoPostos = document.createElement("div");
        divInfoPostos.classList.add("infoPostosComum");

        // Crie um elemento h2 com o texto "Posto Avenida BR Petrobrás"
        var h2 = document.createElement("h2");
        h2.textContent = element.nome;

        // Crie um elemento p com o texto "O que possui:"
        var p = document.createElement("p");
        p.textContent = "O que possui:";

        // Crie uma lista não ordenada (ul)
        var ul = document.createElement("ul");
        ul.classList.add('ulist')

         // Crie elementos li e adicione texto a eles
         if (element.possui!=0 || element.possui!="") {
            element.possui.map((e, i) => {
                var li = document.createElement("li");
                li.textContent = element.possui[i];
                // Adicione os elementos li à lista ul
                ul.appendChild(li);
            })
            
        }
      

        // Crie um elemento de âncora (a) com o link para o Google Maps
        var a = document.createElement("a");
        if (element.tipo == "PostosPetrobras") {
            a.classList.add("infoPostosPetrobras")
        }else{
            a.classList.add("infoPostosComum")
        }

        if (element.tipo == "PostosShell") {
            a.classList.add("infoPostosShell")
        }else{
            a.classList.add("infoPostosComum")
        }

        if (element.tipo == "PostosIpiranga") {
            a.classList.add("infoPostosIpiranga")
        }else{
            a.classList.add("infoPostosComum")
        }

        a.href = "https://www.google.com/maps?q=" + element.lat + "," + element.lng +"&output=embed";
        // a.setAttribute("target","_blank")
        a.setAttribute("class","btnLinkMaps")
        a.textContent = "Ver Mapa";

        a.addEventListener("click",(event)=>{
            a.preventDefault(); // Impede o comportamento padrão do link
            window.open(a.href, "_blank"); // Abre a URL em uma nova guia
        })
        // const btnLinkMaps=[...document.getElementsByClassName("btnLinkMaps")]
        // btnLinkMaps.map((e)=>{
        //     console.log(e)
        //     e.addEventListener("click",()=>{
        //         // Impede o comportamento padrão do link
        //         window.open(e.href, "_blank"); // Abre a URL em uma nova guia
        //     })
        // })
       

        // Adicione todos os elementos criados à estrutura do DOM
        divInfoPostos.appendChild(h2);
        divInfoPostos.appendChild(p);
        divInfoPostos.appendChild(ul);
        divInfoPostos.appendChild(a);

        divLineInfo.appendChild(divFoto);
        divLineInfo.appendChild(divInfoPostos);

        // Agora você pode adicionar divLineInfo ao documento, por exemplo:

        CardPosto.appendChild(divLineInfo)
    });

}, function (error) {
    // Função de erro
    console.error(`Erro ao obter a localização: ${error.message}`);
    alert("Não foi possivel ajustar os Postos mais proximos")
    cordsPostos.forEach(element => {
        // Crie um elemento div com a classe "lineInfo"
        var divLineInfo = document.createElement("div");
        divLineInfo.classList.add("lineInfo");

        // Crie um elemento div com a classe "foto"
        var divFoto = document.createElement("div");
        divFoto.classList.add("foto");
        // var foto = document.createElement("img")
        // foto.setAttribute("src",element.img)
        // foto.appendChild(divFoto)

        // Crie um elemento div com a classe "infoPostosPetrobras"
        var divInfoPostos = document.createElement("div");
        divInfoPostos.classList.add("infoPostosComum");

        // Crie um elemento h2 com o texto "Posto Avenida BR Petrobrás"
        var h2 = document.createElement("h2");
        h2.textContent = element.nome;

        // Crie um elemento p com o texto "O que possui:"
        var p = document.createElement("p");
        p.textContent = "O que possui:";

        // Crie uma lista não ordenada (ul)
        var ul = document.createElement("ul");
        ul.classList.add('ulist')

         // Crie elementos li e adicione texto a eles
         if (element.possui!=0 || element.possui!="") {
            element.possui.map((e, i) => {
                var li = document.createElement("li");
                li.textContent = element.possui[i];
                // Adicione os elementos li à lista ul
                ul.appendChild(li);
            })
            
        }
      

        // Crie um elemento de âncora (a) com o link para o Google Maps
        var a = document.createElement("a");
        if (element.tipo == "PostosPetrobras") {
            a.classList.add("infoPostosPetrobras")
        }else{
            a.classList.add("infoPostosComum")
        }

        if (element.tipo == "PostosShell") {
            a.classList.add("infoPostosShell")
        }else{
            a.classList.add("infoPostosComum")
        }

        if (element.tipo == "PostosIpiranga") {
            a.classList.add("infoPostosIpiranga")
        }else{
            a.classList.add("infoPostosComum")
        }

        a.href = "https://www.google.com/maps?q=" + element.lat + "," + element.lng;
        a.textContent = "Ver Mapa";

        // Adicione todos os elementos criados à estrutura do DOM
        divInfoPostos.appendChild(h2);
        divInfoPostos.appendChild(p);
        divInfoPostos.appendChild(ul);
        divInfoPostos.appendChild(a);

        divLineInfo.appendChild(divFoto);
        divLineInfo.appendChild(divInfoPostos);

        // Agora você pode adicionar divLineInfo ao documento, por exemplo:

        CardPosto.appendChild(divLineInfo)
    });
}, options);






