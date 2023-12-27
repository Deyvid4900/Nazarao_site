"use strict";

var _postos = require("./postos.js");

var btnBuscarCep = document.getElementById("btnBuscarCep");
var CardPosto = document.getElementById("CardPosto");
var btnCloseModal = document.getElementById("btnCloseModal");
var pontoMaisProximo = null;
var menorDistancia = Infinity;
var shouldStop = false;

function calcularDistancia(lat1, lon1, lat2, lon2) {
  var raio = 6371; // Raio médio da Terra em quilômetros

  var dLat = (lat2 - lat1) * (Math.PI / 180);
  var dLon = (lon2 - lon1) * (Math.PI / 180);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distancia = raio * c; // Distância em quilômetros

  return distancia;
}

document.addEventListener("DOMContentLoaded", function () {
  var loading = document.getElementById('loading');
  var options = {
    enableHighAccuracy: true,
    // Reduz a precisão
    timeout: 15000,
    // Tempo limite em milissegundos
    maximumAge: 0 // Não usar cache

  };
  navigator.geolocation.getCurrentPosition(function (position) {
    loading.style.display = "block";
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    console.log(position); // Iterar sobre os objetos e calcular as distâncias

    _postos.cordsPostos.forEach(function (local) {
      var distancia = calcularDistancia(lat, lng, local.lat, local.lng);

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        pontoMaisProximo = local;
      }
    }); // Função de comparação para o método sort


    function compararDistancia(a, b) {
      var distanciaA = calcularDistancia(lat, lng, a.lat, a.lng);
      var distanciaB = calcularDistancia(lat, lng, b.lat, b.lng);
      return distanciaA - distanciaB;
    } // Calcula a distância e encontra o posto mais próximo


    _postos.cordsPostos.forEach(function (local) {
      var distancia = calcularDistancia(lat, lng, local.lat, local.lng);

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        pontoMaisProximo = local;
      }
    });

    console.log("O ponto mais próximo é:", pontoMaisProximo);
    console.log("Distância:", menorDistancia, "quilômetros");
    console.log(lat);
    console.log(lng); // Ordene o array com base na distância

    _postos.cordsPostos.sort(compararDistancia);

    _postos.cordsPostos.map(function (element, i) {
      if (shouldStop) return; // Crie um elemento div com a classe "lineInfo"

      var divLineInfo = document.createElement("div");
      divLineInfo.classList.add("lineInfo"); // Crie um elemento div com a classe "foto"

      var divFoto = document.createElement("div");
      divFoto.classList.add("foto");
      divFoto.style.backgroundImage = "url(".concat(element.img, ")"); // Crie um elemento div com a classe "infoPostosPetrobras"

      var divInfoPostos = document.createElement("div");
      divInfoPostos.classList.add("infoPostosComum"); // Crie um elemento h2 com o texto "Posto Avenida BR Petrobrás"

      var h2 = document.createElement("h2");
      h2.textContent = element.nome; // Crie um elemento p com o texto "O que possui:"

      var p = document.createElement("p");
      p.textContent = "O que possui:"; // Crie uma lista não ordenada (ul)

      var ul = document.createElement("ul");
      ul.classList.add('ulist'); // Crie elementos li e adicione texto a eles

      if (element.possui != 0 || element.possui != "") {
        element.possui.map(function (e, i) {
          var li = document.createElement("li");
          li.textContent = element.possui[i]; // Adicione os elementos li à lista ul

          ul.appendChild(li);
        });
      } // Crie um elemento de âncora (a) com o link para o Google Maps


      var a = document.createElement("a");

      if (element.tipo == "PostosPetrobras") {
        a.style.marginTop = "-5px";
        a.style.padding = "2px 40px";
        a.style.borderRadius = "2px";
        a.style.fontSize = "14px";
        a.style.color = "white";
        a.style.backgroundColor = "#1B965F";
      } else {
        a.classList.add("infoPostosComum");
      }

      if (element.tipo == "PostosShell") {
        a.style.marginTop = "-5px";
        a.style.padding = "2px 40px";
        a.style.borderRadius = "2px";
        a.style.fontSize = "14px";
        a.style.color = "white";
        a.style.backgroundColor = "#F51D21 ";
      } else {
        a.classList.add("infoPostosComum");
      }

      if (element.tipo == "PostosIpiranga") {
        a.style.marginTop = "-5px";
        a.style.padding = "2px 40px";
        a.style.borderRadius = "2px";
        a.style.fontSize = "14px";
        a.style.color = "white";
        a.style.backgroundColor = "#1278E8 ";
      } else {
        a.classList.add("infoPostosComum");
      }

      a.href = "https://www.google.com/maps/search/?api=1&query=".concat(element.lat, ",").concat(element.lng, "&query_place=").concat(element.nome);
      a.setAttribute("class", "btnLinkMaps");
      a.textContent = "Ver Mapa";
      a.addEventListener("click", function (event) {
        a.preventDefault(); // Impede o comportamento padrão do link

        window.open(a.href, "_blank"); // Abre a URL em uma nova guia
      }); // Adicione todos os elementos criados à estrutura do DOM

      divInfoPostos.appendChild(h2);
      divInfoPostos.appendChild(p);
      divInfoPostos.appendChild(ul);
      divInfoPostos.appendChild(a);
      divLineInfo.appendChild(divFoto);
      divLineInfo.appendChild(divInfoPostos); // Agora você pode adicionar divLineInfo ao documento, por exemplo:

      CardPosto.appendChild(divLineInfo);

      if (i === 4) {
        shouldStop = true;
      }

      loading.style.display = "none";
    });
  }, function (error) {
    // Função de erro
    console.error("Erro ao obter a localiza\xE7\xE3o: ".concat(error.message)); // alert("Não foi possivel ajustar os Postos mais proximos")

    _postos.cordsPostos.forEach(function (element) {
      // Crie um elemento div com a classe "lineInfo"
      var divLineInfo = document.createElement("div");
      divLineInfo.classList.add("lineInfo"); // Crie um elemento div com a classe "foto"

      var divFoto = document.createElement("div");
      divFoto.classList.add("foto");
      divFoto.style.backgroundImage = "url(".concat(element.img, ")"); // Crie um elemento div com a classe "infoPostosPetrobras"

      var divInfoPostos = document.createElement("div");
      divInfoPostos.classList.add("infoPostosComum"); // Crie um elemento h2 com o texto "Posto Avenida BR Petrobrás"

      var h2 = document.createElement("h2");
      h2.textContent = element.nome; // Crie um elemento p com o texto "O que possui:"

      var p = document.createElement("p");
      p.textContent = "O que possui:"; // Crie uma lista não ordenada (ul)

      var ul = document.createElement("ul");
      ul.classList.add('ulist'); // Crie elementos li e adicione texto a eles

      if (element.possui != 0 || element.possui != "") {
        element.possui.map(function (e, i) {
          var li = document.createElement("li");
          li.textContent = element.possui[i]; // Adicione os elementos li à lista ul

          ul.appendChild(li);
        });
      } // Crie um elemento de âncora (a) com o link para o Google Maps


      var a = document.createElement("a");

      if (element.tipo == "PostosPetrobras") {
        a.style.marginTop = "-5px";
        a.style.padding = "2px 40px";
        a.style.borderRadius = "2px";
        a.style.fontSize = "14px";
        a.style.color = "white";
        a.style.backgroundColor = "#1B965F";
      } else {
        a.classList.add("infoPostosComum");
      }

      if (element.tipo == "PostosShell") {
        a.style.marginTop = "-5px";
        a.style.padding = "2px 40px";
        a.style.borderRadius = "2px";
        a.style.fontSize = "14px";
        a.style.color = "white";
        a.style.backgroundColor = "#F51D21 ";
      } else {
        a.classList.add("infoPostosComum");
      }

      if (element.tipo == "PostosIpiranga") {
        a.style.marginTop = "-5px";
        a.style.padding = "2px 40px";
        a.style.borderRadius = "2px";
        a.style.fontSize = "14px";
        a.style.color = "white";
        a.style.backgroundColor = "#1278E8 ";
      } else {
        a.classList.add("infoPostosComum");
      }

      a.href = "https://www.google.com/maps/search/?api=1&query=".concat(element.lat, ",").concat(element.lng, "&query_place=").concat(element.nome);
      a.setAttribute("class", "btnLinkMaps");
      a.textContent = "Ver Mapa";
      a.addEventListener("click", function (event) {
        a.preventDefault(); // Impede o comportamento padrão do link

        window.open(a.href, "_blank"); // Abre a URL em uma nova guia
      }); // Adicione todos os elementos criados à estrutura do DOM

      divInfoPostos.appendChild(h2);
      divInfoPostos.appendChild(p);
      divInfoPostos.appendChild(ul);
      divInfoPostos.appendChild(a);
      divLineInfo.appendChild(divFoto);
      divLineInfo.appendChild(divInfoPostos); // Agora você pode adicionar divLineInfo ao documento, por exemplo:

      CardPosto.appendChild(divLineInfo);
    });
  }, options);

  function buscarPostosDeAbastecimento(cep) {
    var apiKey = 'AIzaSyDzixHiJAmfIEYkFwc5ysW5xF0RmmoEFRU';
    var radius = 10000; // Raio em metros para a busca (5 km neste exemplo)

    cep = encodeURIComponent(cep);
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=posto+de+gasolina&location=".concat(cep, "&radius=").concat(radius, "&key=").concat(apiKey); // Fazendo a requisição à API usando Fetch

    fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.status === 'OK') {
        // Resultados bem-sucedidos
        exibirResultados(data.results);
      } else {
        // Tratamento de erro
        console.error('Erro na busca de postos de abastecimento.');
      }
    })["catch"](function (error) {
      return console.error('Erro na requisição:', error);
    });
  } // 


  btnBuscarCep.addEventListener("click", function () {
    var loading = document.getElementById('loading');
    var numeroCepInput = document.getElementById("Cep");
    var numeroCep = numeroCepInput.value;
    var cepSemEspacos = numeroCep.replace(/-/g, '');
    var ViaCepUrl = "https://viacep.com.br/ws/".concat(cepSemEspacos, "/json/");
    CardPosto.innerHTML = ""; // Use o fetch para fazer a solicitação HTTP
    // buscarPostosDeAbastecimento(numeroCep)

    if (numeroCep.length < 8) {
      document.getElementById("modalOverlay").style.display = "flex";
      btnCloseModal.addEventListener("click", function () {
        document.getElementById("modalOverlay").style.display = "none";
        location.reload();
      });
      return;
    }

    loading.style.display = "block";
    console.log(loading);
    fetch(ViaCepUrl).then(function (response) {
      // Verifique se a resposta foi bem-sucedida (código de status 200)
      console.log(response);

      if (!response.ok) {
        throw new Error('Não foi possível obter as informações do CEP');
      }

      return response.json();
    }).then(function (data) {
      // Use os dados obtidos a partir da resposta
      var endereco = "\"".concat(data.logradouro, "\",") + "\"".concat(data.bairro, "\",") + "\"".concat(data.localidade, "\""); // let endereco = data.localidade + ',' + data.bairro + ',' + data.logradouro + ""

      console.log(endereco);
      var apiKey = 'AIzaSyDzixHiJAmfIEYkFwc5ysW5xF0RmmoEFRU';
      var geocodingUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=".concat(endereco, "&key=").concat(apiKey);
      fetch(geocodingUrl).then(function (response) {
        if (!response.ok) {
          throw new Error('Não foi possível obter as coordenadas');
        }

        return response.json();
      }).then(function (data) {
        // Acesse as coordenadas lat e lng a partir dos dados de resposta
        loading.style.display = "none";
        console.log(loading);
        var menorDistancia = Infinity;
        var pontoMaisProximo = null;
        console.log(data);

        function calcularDistancia(lat1, lon1, lat2, lon2) {
          var raio = 6371; // Raio médio da Terra em quilômetros

          var dLat = (lat2 - lat1) * (Math.PI / 180);
          var dLon = (lon2 - lon1) * (Math.PI / 180);
          var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var distancia = raio * c; // Distância em quilômetros

          return distancia;
        }

        if (data.status === 'OK' && data.results.length > 0) {
          var compararDistancia = function compararDistancia(a, b) {
            var distanciaA = calcularDistancia(lat, lng, a.lat, a.lng);
            var distanciaB = calcularDistancia(lat, lng, b.lat, b.lng);
            return distanciaA - distanciaB;
          };

          var _location = data.results[0].geometry.location;
          console.log(_location);
          var lat = _location.lat;
          var lng = _location.lng;
          console.log("Latitude: ".concat(lat, ", Longitude: ").concat(lng));

          _postos.cordsPostos.forEach(function (local) {
            var distancia = calcularDistancia(lat, lng, local.lat, local.lng);

            if (distancia < menorDistancia) {
              menorDistancia = distancia;
              pontoMaisProximo = local;
            }
          });

          console.log("O ponto mais próximo é:", pontoMaisProximo);
          console.log("Distância:", menorDistancia, "quilômetros");
          console.log(lat);
          console.log(lng);

          _postos.cordsPostos.sort(compararDistancia);

          _postos.cordsPostos.slice(0, 5).forEach(function (posto, i) {
            var divLineInfo = document.createElement("div");
            divLineInfo.classList.add("lineInfo"); // Crie um elemento div com a classe "foto"

            var divFoto = document.createElement("div");
            divFoto.classList.add("foto");
            divFoto.style.backgroundImage = "url(".concat(posto.img, ")"); // Crie um elemento div com a classe "infoPostosPetrobras"

            var divInfoPostos = document.createElement("div");
            divInfoPostos.classList.add("infoPostosComum"); // Crie um elemento h2 com o texto "Posto Avenida BR Petrobrás"

            var h2 = document.createElement("h2");
            h2.textContent = posto.nome; // Crie um elemento p com o texto "O que possui:"

            var p = document.createElement("p");
            p.textContent = "O que possui:"; // Crie uma lista não ordenada (ul)

            var ul = document.createElement("ul");
            ul.classList.add('ulist'); // Crie elementos li e adicione texto a eles

            if (posto.possui != 0 || posto.possui != "") {
              posto.possui.map(function (e, i) {
                var li = document.createElement("li");
                li.textContent = posto.possui[i]; // Adicione os elementos li à lista ul

                ul.appendChild(li);
              });
            } // Crie um elemento de âncora (a) com o link para o Google Maps


            var a = document.createElement("a");

            if (posto.tipo == "PostosPetrobras") {
              a.style.marginTop = "-5px";
              a.style.padding = "2px 40px";
              a.style.borderRadius = "2px";
              a.style.fontSize = "14px";
              a.style.color = "white";
              a.style.backgroundColor = "#1B965F";
            } else {
              a.classList.add("infoPostosComum");
            }

            if (posto.tipo == "PostosShell") {
              a.style.marginTop = "-5px";
              a.style.padding = "2px 40px";
              a.style.borderRadius = "2px";
              a.style.fontSize = "14px";
              a.style.color = "white";
              a.style.backgroundColor = "#F51D21 ";
            } else {
              a.classList.add("infoPostosComum");
            }

            if (posto.tipo == "PostosIpiranga") {
              a.style.marginTop = "-5px";
              a.style.padding = "2px 40px";
              a.style.borderRadius = "2px";
              a.style.fontSize = "14px";
              a.style.color = "white";
              a.style.backgroundColor = "#1278E8 ";
            } else {
              a.classList.add("infoPostosComum");
            }

            a.href = "https://www.google.com/maps/search/?api=1&query=".concat(posto.lat, ",").concat(posto.lng, "&query_place=").concat(posto.nome);
            a.setAttribute("class", "btnLinkMaps");
            a.textContent = "Ver Mapa";
            a.addEventListener("click", function () {
              a.preventDefault(); // Impede o comportamento padrão do link

              window.open(a.href, "_blank"); // Abre a URL em uma nova guia
            }); // Adicione todos os elementos criados à estrutura do DOM

            divInfoPostos.appendChild(h2);
            divInfoPostos.appendChild(p);
            divInfoPostos.appendChild(ul);
            divInfoPostos.appendChild(a);
            divLineInfo.appendChild(divFoto);
            divLineInfo.appendChild(divInfoPostos); // Agora você pode adicionar divLineInfo ao documento, por exemplo:

            CardPosto.appendChild(divLineInfo);
          });
        } else {
          console.error('Endereço não encontrado ou sem resultados');
          alert('Endereço não encontrado ou sem resultado');
        }
      })["catch"](function (error) {
        console.error(error);
      });
    })["catch"](function (error) {
      console.error(error); // Lidar com erros, como CEP não encontrado
    });
  }); // 
});