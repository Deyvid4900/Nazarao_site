import { cordsPostos } from "./postos.js";
const btnBuscarCep = document.getElementById("btnBuscarCep")
const CardPosto = document.getElementById("CardPosto")
const btnCloseModal = document.getElementById("btnCloseModal")

let pontoMaisProximo = null;
let menorDistancia = Infinity;

let shouldStop = false

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


document.addEventListener("DOMContentLoaded", function () {
    const loading = document.getElementById('loading')

    const options = {
        enableHighAccuracy: true, // Reduz a precisão
        timeout: 15000, // Tempo limite em milissegundos
        maximumAge: 0 // Não usar cache
    };
    navigator.geolocation.getCurrentPosition(function (position) {
        loading.style.display = "block";
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;


        // Iterar sobre os objetos e calcular as distâncias
        cordsPostos.forEach(local => {
            const distancia = calcularDistancia(lat, lng, local.lat, local.lng);
            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                pontoMaisProximo = local;
            }
        });

        // Função de comparação para o método sort
        function compararDistancia(a, b) {
            const distanciaA = calcularDistancia(lat, lng, a.lat, a.lng);
            const distanciaB = calcularDistancia(lat, lng, b.lat, b.lng);
            return (distanciaA - distanciaB)
        }
        console.log("O ponto mais próximo é:", pontoMaisProximo);
        console.log("Distância:", menorDistancia, "quilômetros");
        console.log(lat);
        console.log(lng);


        // Ordene o array com base na distância
        cordsPostos.sort(compararDistancia);
        const postosOrdenados = cordsPostos.map(posto => ({
            ...posto,
            distancia: calcularDistancia(lat, lng, posto.lat, posto.lng)
        })).sort((a, b) => a.distancia - b.distancia);




        cordsPostos.map((element, i) => {
            if (shouldStop) return;


            // Crie um elemento div com a classe "lineInfo"
            var divLineInfo = document.createElement("div");
            divLineInfo.classList.add("lineInfo");

            // Crie um elemento div com a classe "foto"
            var divFoto = document.createElement("div");
            divFoto.classList.add("foto");
            divFoto.style.backgroundImage = `url(${element.img})`



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
            if (element.possui != 0 || element.possui != "") {
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
                a.style.marginTop = "-5px";
                a.style.padding = "2px 40px";
                a.style.borderRadius = "2px";
                a.style.fontSize = "14px";
                a.style.color = "white";
                a.style.backgroundColor = "#1B965F";
            } else {
                a.classList.add("infoPostosComum")
            }

            if (element.tipo == "PostosShell") {
                a.style.marginTop = "-5px";
                a.style.padding = "2px 40px";
                a.style.borderRadius = "2px";
                a.style.fontSize = "14px";
                a.style.color = "white";
                a.style.backgroundColor = "#F51D21 ";
            } else {
                a.classList.add("infoPostosComum")
            }

            if (element.tipo == "PostosIpiranga") {
                a.style.marginTop = "-5px";
                a.style.padding = "2px 40px";
                a.style.borderRadius = "2px";
                a.style.fontSize = "14px";
                a.style.color = "white";
                a.style.backgroundColor = "#1278E8 ";
            } else {
                a.classList.add("infoPostosComum")
            }
            a.href = `https://www.google.com/maps/search/?api=1&query=${element.lat},${element.lng}&query_place=${element.nome}`;


            a.setAttribute("class", "btnLinkMaps")
            a.textContent = "Ver Mapa";

            a.addEventListener("click", (event) => {
                a.preventDefault(); // Impede o comportamento padrão do link
                window.open(a.href, "_blank"); // Abre a URL em uma nova guia
            })

            // Adicione todos os elementos criados à estrutura do DOM
            divInfoPostos.appendChild(h2);
            divInfoPostos.appendChild(p);
            divInfoPostos.appendChild(ul);
            divInfoPostos.appendChild(a);

            divLineInfo.appendChild(divFoto);
            divLineInfo.appendChild(divInfoPostos);

            // Agora você pode adicionar divLineInfo ao documento, por exemplo:

            CardPosto.appendChild(divLineInfo)

            if (i === 4) {
                shouldStop = true;
            }
            loading.style.display = "none";

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
            divFoto.style.backgroundImage = `url(${element.img})`

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
            if (element.possui != 0 || element.possui != "") {
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
                a.style.marginTop = "-5px";
                a.style.padding = "2px 40px";
                a.style.borderRadius = "2px";
                a.style.fontSize = "14px";
                a.style.color = "white";
                a.style.backgroundColor = "#1B965F";
            } else {
                a.classList.add("infoPostosComum")
            }

            if (element.tipo == "PostosShell") {
                a.style.marginTop = "-5px";
                a.style.padding = "2px 40px";
                a.style.borderRadius = "2px";
                a.style.fontSize = "14px";
                a.style.color = "white";
                a.style.backgroundColor = "#F51D21 ";
            } else {
                a.classList.add("infoPostosComum")
            }

            if (element.tipo == "PostosIpiranga") {
                a.style.marginTop = "-5px";
                a.style.padding = "2px 40px";
                a.style.borderRadius = "2px";
                a.style.fontSize = "14px";
                a.style.color = "white";
                a.style.backgroundColor = "#1278E8 ";
            } else {
                a.classList.add("infoPostosComum")
            }
            a.href = `https://www.google.com/maps/search/?api=1&query=${element.lat},${element.lng}&query_place=${element.nome}`;

            a.setAttribute("class", "btnLinkMaps")
            a.textContent = "Ver Mapa";

            a.addEventListener("click", (event) => {
                a.preventDefault(); // Impede o comportamento padrão do link
                window.open(a.href, "_blank"); // Abre a URL em uma nova guia
            })



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


    // 
    btnBuscarCep.addEventListener("click", () => {
        const loading = document.getElementById('loading')
        const numeroCepInput = document.getElementById("Cep");
        
        let numeroCep = numeroCepInput.value

        const cepSemEspacos = numeroCep.replace(/\s/g, "");
        const ViaCepUrl = `https://viacep.com.br/ws/${cepSemEspacos}/json/`;

        CardPosto.innerHTML = "";
        // Use o fetch para fazer a solicitação HTTP



        if (numeroCep.length < 8) {
            document.getElementById("modalOverlay").style.display = "flex";
            btnCloseModal.addEventListener("click",()=>{
                document.getElementById("modalOverlay").style.display = "none";
                location.reload();
            })
            return
        }
        loading.style.display = "block";
        console.log(loading)
        fetch(ViaCepUrl)
            .then(response => {
                // Verifique se a resposta foi bem-sucedida (código de status 200)

                console.log(response)
                if (!response.ok) {
                    throw new Error('Não foi possível obter as informações do CEP');
                }
                return response.json();
            })
            .then(data => {



                // Use os dados obtidos a partir da resposta
                let endereco = `"${data.logradouro}",` + `"${data.bairro}",` + `"${data.localidade}"`
                // let endereco = data.localidade + ',' + data.bairro + ',' + data.logradouro + ""
                console.log(endereco)
                const apiKey = 'AIzaSyB46wG7bMX070nj2Avrb24R-R7F5ihAfwM';
                const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=${apiKey}`;
                fetch(geocodingUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Não foi possível obter as coordenadas');
                        }

                        return response.json();

                    })
                    .then(data => {
                        // Acesse as coordenadas lat e lng a partir dos dados de resposta
                        loading.style.display = "none";

                        console.log(loading)
                        let menorDistancia = Infinity;
                        let pontoMaisProximo = null;
                        console.log(data)


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
                        if (data.status === 'OK' && data.results.length > 0) {
                            const location = data.results[0].geometry.location;
                            console.log(location)
                            const lat = location.lat;
                            const lng = location.lng;
                            console.log(`Latitude: ${lat}, Longitude: ${lng}`);

                            function compararDistancia(a, b) {
                                const distanciaA = calcularDistancia(lat, lng, a.lat, a.lng);
                                const distanciaB = calcularDistancia(lat, lng, b.lat, b.lng);
                                return (distanciaA - distanciaB)
                            }

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

                            cordsPostos.sort(compararDistancia);



                            cordsPostos.slice(0, 5).forEach((posto, i) => {
                                var divLineInfo = document.createElement("div");
                                divLineInfo.classList.add("lineInfo");

                                // Crie um elemento div com a classe "foto"
                                var divFoto = document.createElement("div");
                                divFoto.classList.add("foto");
                                divFoto.style.backgroundImage = `url(${posto.img})`

                                // Crie um elemento div com a classe "infoPostosPetrobras"
                                var divInfoPostos = document.createElement("div");
                                divInfoPostos.classList.add("infoPostosComum");

                                // Crie um elemento h2 com o texto "Posto Avenida BR Petrobrás"
                                var h2 = document.createElement("h2");
                                h2.textContent = posto.nome;

                                // Crie um elemento p com o texto "O que possui:"
                                var p = document.createElement("p");
                                p.textContent = "O que possui:";

                                // Crie uma lista não ordenada (ul)
                                var ul = document.createElement("ul");
                                ul.classList.add('ulist')

                                // Crie elementos li e adicione texto a eles
                                if (posto.possui != 0 || posto.possui != "") {
                                    posto.possui.map((e, i) => {
                                        var li = document.createElement("li");
                                        li.textContent = posto.possui[i];
                                        // Adicione os elementos li à lista ul
                                        ul.appendChild(li);
                                    })

                                }


                                // Crie um elemento de âncora (a) com o link para o Google Maps
                                var a = document.createElement("a");
                                if (posto.tipo == "PostosPetrobras") {
                                    a.style.marginTop = "-5px";
                                    a.style.padding = "2px 40px";
                                    a.style.borderRadius = "2px";
                                    a.style.fontSize = "14px";
                                    a.style.color = "white";
                                    a.style.backgroundColor = "#1B965F";
                                } else {
                                    a.classList.add("infoPostosComum")
                                }

                                if (posto.tipo == "PostosShell") {
                                    a.style.marginTop = "-5px";
                                    a.style.padding = "2px 40px";
                                    a.style.borderRadius = "2px";
                                    a.style.fontSize = "14px";
                                    a.style.color = "white";
                                    a.style.backgroundColor = "#F51D21 ";
                                } else {
                                    a.classList.add("infoPostosComum")
                                }

                                if (posto.tipo == "PostosIpiranga") {
                                    a.style.marginTop = "-5px";
                                    a.style.padding = "2px 40px";
                                    a.style.borderRadius = "2px";
                                    a.style.fontSize = "14px";
                                    a.style.color = "white";
                                    a.style.backgroundColor = "#1278E8 ";
                                } else {
                                    a.classList.add("infoPostosComum")
                                }
                                a.href = `https://www.google.com/maps/search/?api=1&query=${posto.lat},${posto.lng}&query_place=${posto.nome}`;



                                a.setAttribute("class", "btnLinkMaps")
                                a.textContent = "Ver Mapa";

                                a.addEventListener("click", () => {
                                    a.preventDefault(); // Impede o comportamento padrão do link
                                    window.open(a.href, "_blank"); // Abre a URL em uma nova guia
                                })

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


                        } else {
                            console.error('Endereço não encontrado ou sem resultados');
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });



            })
            .catch(error => {
                console.error(error);
                // Lidar com erros, como CEP não encontrado
            });
    })



    // 



});





