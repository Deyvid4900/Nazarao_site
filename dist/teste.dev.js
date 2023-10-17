"use strict";

var _postos = require("./postos.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var btnBuscarCep = document.getElementById("btnBuscarCep");
var CardPosto = document.getElementById("CardPosto");
var pontoMaisProximo = null;
var menorDistancia = Infinity;
var shouldStop = false;
document.addEventListener("DOMContentLoaded", function () {
  var options = {
    enableHighAccuracy: true,
    // Reduz a precisão
    timeout: 15000,
    // Tempo limite em milissegundos
    maximumAge: 0 // Não usar cache

  };
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    function calcularDistancia(lat1, lon1, lat2, lon2) {
      var raio = 6371; // Raio médio da Terra em quilômetros

      var dLat = (lat2 - lat1) * (Math.PI / 180);
      var dLon = (lon2 - lon1) * (Math.PI / 180);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var distancia = raio * c; // Distância em quilômetros

      return distancia;
    } // Iterar sobre os objetos e calcular as distâncias


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
    console.log(lng); // Função de comparação para o método sort

    function compararDistancia(a, b) {
      var distanciaA = calcularDistancia(lat, lng, a.lat, a.lng);
      var distanciaB = calcularDistancia(lat, lng, b.lat, b.lng);
      return distanciaA - distanciaB;
    } // Ordene o array com base na distância


    _postos.cordsPostos.sort(compararDistancia);

    var postosOrdenados = _postos.cordsPostos.map(function (posto) {
      return _objectSpread({}, posto, {
        distancia: calcularDistancia(lat, lng, posto.lat, posto.lng)
      });
    }).sort(function (a, b) {
      return a.distancia - b.distancia;
    });

    console.log("Array ordenado:", postosOrdenados);

    _postos.cordsPostos.map(function (element, i) {
      if (shouldStop) return;
      console.log(i); // Crie um elemento div com a classe "lineInfo"

      var divLineInfo = document.createElement("div");
      divLineInfo.classList.add("lineInfo"); // Crie um elemento div com a classe "foto"

      var divFoto = document.createElement("div");
      divFoto.classList.add("foto"); // var foto = document.createElement("img")
      // foto.setAttribute("src",element.img)
      // foto.appendChild(divFoto)
      // Crie um elemento div com a classe "infoPostosPetrobras"

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
        a.classList.add("infoPostosPetrobras");
      } else {
        a.classList.add("infoPostosComum");
      }

      if (element.tipo == "PostosShell") {
        a.classList.add("infoPostosShell");
      } else {
        a.classList.add("infoPostosComum");
      }

      if (element.tipo == "PostosIpiranga") {
        a.classList.add("infoPostosIpiranga");
      } else {
        a.classList.add("infoPostosComum");
      }

      a.href = "https://www.google.com/maps/search/?api=1&query=".concat(element.lat, ",").concat(element.lng, "&query_place=").concat(element.nome); // a.href = "https://www.google.com/maps?q=" + element.lat + "," + element.lng;
      // a.setAttribute("target","_blank")

      a.setAttribute("class", "btnLinkMaps");
      a.textContent = "Ver Mapa";
      a.addEventListener("click", function (event) {
        a.preventDefault(); // Impede o comportamento padrão do link

        window.open(a.href, "_blank"); // Abre a URL em uma nova guia
      }); // const btnLinkMaps=[...document.getElementsByClassName("btnLinkMaps")]
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
      divLineInfo.appendChild(divInfoPostos); // Agora você pode adicionar divLineInfo ao documento, por exemplo:

      CardPosto.appendChild(divLineInfo);

      if (i === 4) {
        shouldStop = true;
      }
    });
  }, function (error) {
    // Função de erro
    console.error("Erro ao obter a localiza\xE7\xE3o: ".concat(error.message));
    alert("Não foi possivel ajustar os Postos mais proximos");

    _postos.cordsPostos.forEach(function (element) {
      // Crie um elemento div com a classe "lineInfo"
      var divLineInfo = document.createElement("div");
      divLineInfo.classList.add("lineInfo"); // Crie um elemento div com a classe "foto"

      var divFoto = document.createElement("div");
      divFoto.classList.add("foto"); // var foto = document.createElement("img")
      // foto.setAttribute("src",element.img)
      // foto.appendChild(divFoto)
      // Crie um elemento div com a classe "infoPostosPetrobras"

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
        a.classList.add("infoPostosPetrobras");
      } else {
        a.classList.add("infoPostosComum");
      }

      if (element.tipo == "PostosShell") {
        a.classList.add("infoPostosShell");
      } else {
        a.classList.add("infoPostosComum");
      }

      if (element.tipo == "PostosIpiranga") {
        a.classList.add("infoPostosIpiranga");
      } else {
        a.classList.add("infoPostosComum");
      }

      a.href = "https://www.google.com/maps/search/?api=1&query=".concat(element.lat, ",").concat(element.lng, "&query_place=").concat(element.nome); // a.href = "https://www.google.com/maps?q=" + element.lat + "," + element.lng;
      // a.setAttribute("target","_blank")

      a.setAttribute("class", "btnLinkMaps");
      a.textContent = "Ver Mapa";
      a.addEventListener("click", function (event) {
        a.preventDefault(); // Impede o comportamento padrão do link

        window.open(a.href, "_blank"); // Abre a URL em uma nova guia
      }); // const btnLinkMaps=[...document.getElementsByClassName("btnLinkMaps")]
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
      divLineInfo.appendChild(divInfoPostos); // Agora você pode adicionar divLineInfo ao documento, por exemplo:

      CardPosto.appendChild(divLineInfo);
    });
  }, options); // 

  btnBuscarCep.addEventListener("click", function () {
    var numeroCep = document.getElementById("Cep");
    var url = "https://viacep.com.br/ws/".concat(numeroCep.value, "/json/");
    CardPosto.innerHTML = ""; // Use o fetch para fazer a solicitação HTTP

    fetch(url).then(function (response) {
      // Verifique se a resposta foi bem-sucedida (código de status 200)
      if (!response.ok) {
        throw new Error('Não foi possível obter as informações do CEP');
      }

      return response.json();
    }).then(function (data) {
      // Use os dados obtidos a partir da resposta
      console.log(data);
      var endereco = data.localidade + ',' + data.bairro + ',' + data.logradouro;
      console.log(endereco);
      var apiKey = 'AIzaSyB46wG7bMX070nj2Avrb24R-R7F5ihAfwM';
      var geocodingUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=".concat(endereco, "&key=").concat(apiKey);
      fetch(geocodingUrl).then(function (response) {
        if (!response.ok) {
          throw new Error('Não foi possível obter as coordenadas');
        }

        return response.json();
      }).then(function (data) {
        // Acesse as coordenadas lat e lng a partir dos dados de resposta
        if (data.status === 'OK' && data.results.length > 0) {
          var calcularDistancia = function calcularDistancia(lat1, lon1, lat2, lon2) {
            var raio = 6371; // Raio médio da Terra em quilômetros

            var dLat = (lat2 - lat1) * (Math.PI / 180);
            var dLon = (lon2 - lon1) * (Math.PI / 180);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var distancia = raio * c; // Distância em quilômetros

            return distancia;
          };

          var compararDistancia = function compararDistancia(a, b) {
            var distanciaA = calcularDistancia(lat, lng, a.lat, a.lng);
            var distanciaB = calcularDistancia(lat, lng, b.lat, b.lng);
            return distanciaA - distanciaB;
          };

          var location = data.results[0].geometry.location;
          var lat = location.lat;
          var lng = location.lng;
          console.log("Latitude: ".concat(lat, ", Longitude: ").concat(lng));

          _postos.cordsPostos.forEach(function (local) {
            var distancia = calcularDistancia(lat, lng, local.lat, local.lng);

            if (distancia < menorDistancia) {
              menorDistancia = distancia;
              pontoMaisProximo = local;
            }
          });

          _postos.cordsPostos.sort(compararDistancia);

          _postos.cordsPostos.slice(0, 5).forEach(function (posto, i) {
            var divLineInfo = document.createElement("div");
            divLineInfo.classList.add("lineInfo"); // Crie um elemento div com a classe "foto"

            var divFoto = document.createElement("div");
            divFoto.classList.add("foto"); // var foto = document.createElement("img")
            // foto.setAttribute("src",element.img)
            // foto.appendChild(divFoto)
            // Crie um elemento div com a classe "infoPostosPetrobras"

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
              a.classList.add("infoPostosPetrobras");
            } else {
              a.classList.add("infoPostosComum");
            }

            if (posto.tipo == "PostosShell") {
              a.classList.add("infoPostosShell");
            } else {
              a.classList.add("infoPostosComum");
            }

            if (posto.tipo == "PostosIpiranga") {
              a.classList.add("infoPostosIpiranga");
            } else {
              a.classList.add("infoPostosComum");
            }

            a.href = "https://www.google.com/maps/search/?api=1&query=".concat(posto.lat, ",").concat(posto.lng, "&query_place=").concat(posto.nome); // a.href = "https://www.google.com/maps?q=" + element.lat + "," + element.lng;
            // a.setAttribute("target","_blank")

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
        }
      })["catch"](function (error) {
        console.error(error);
      });
    })["catch"](function (error) {
      console.error(error); // Lidar com erros, como CEP não encontrado
    });
  }); // 
});