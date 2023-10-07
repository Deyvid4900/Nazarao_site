"use strict";

// AIzaSyDzixHiJAmfIEYkFwc5ysW5xF0RmmoEFRU    api key
// AIzaSyB46wG7bMX070nj2Avrb24R-R7F5ihAfwM
// lat: -20.861831422377254, lng: -41.118637116638055
// lat: -20.84100222644713, lng: -41.18210193771411
var cordsPostos = [{
  lat: -20.861831422377254,
  lng: -41.118637116638055,
  nome: "Posto Avenida",
  img: ""
}, {
  lat: -20.84100222644713,
  lng: -41.18210193771411,
  nome: "Uniposto Derivados",
  img: " "
}, {
  lat: -20.84289295305546,
  lng: -41.12330964952382,
  nome: "São judas tadeu",
  img: " "
}, {
  lat: -20.84888877517764,
  lng: -41.141356476512534,
  nome: "Posto rainha",
  img: " "
}, {
  lat: -20.806676356235418,
  lng: -41.15651244952518,
  nome: "Santa Clara",
  img: " "
}, {
  lat: -21.10271504079641,
  lng: -41.042290889997126,
  nome: "Petromax",
  img: " "
}, {
  lat: -20.678359003705445,
  lng: -41.349042080157936,
  nome: "Pedra da ema",
  img: " "
}, {
  lat: -20.772324166996153,
  lng: -41.677827974441136,
  nome: "Auto Posto Redenção",
  img: " "
}, {
  lat: -20.69391837098185,
  lng: -41.84916749185929,
  nome: "Posto Fronteira",
  img: " "
}, {
  lat: -18.7463493646525,
  lng: -39.86130393241459,
  nome: "Posto Rio Negro",
  img: " "
}, {
  lat: -20.763236704310643,
  lng: -41.59164003049385,
  nome: "Posto Celina",
  img: " "
}, {
  lat: -20.562696620673,
  lng: -41.82431129186433,
  nome: "Auto Posto pedra menina",
  img: " "
}, {
  lat: -20.778280667176023,
  lng: -41.06815942253728,
  nome: "Posto Soturno",
  img: " "
}, {
  lat: -20.85175905869883,
  lng: -41.094232307817414,
  nome: "Posto Coronel Borges",
  img: " "
}, {
  lat: -20.857203590992768,
  lng: -41.10262594583081,
  nome: "Posto Baiminas",
  img: " "
}, {
  lat: -20.814280438079546,
  lng: -41.15874144997447,
  nome: "Posto Trevo",
  img: " "
}, {
  lat: -20.85407148702786,
  lng: -41.11774863233659,
  nome: "Posto Ita",
  img: " "
}, {
  lat: -20.84389240243609,
  lng: -41.12881863217908,
  nome: "Posto alvorada",
  img: " "
}, {
  lat: -20.868121929400584,
  lng: -41.02589251884142,
  nome: "Auto posto Dantas",
  img: " "
}, {
  lat: -20.832372559575184,
  lng: -42.15383419185384,
  nome: "Posto douradense",
  img: " "
}, {
  lat: -18.52727635721204,
  lng: -39.84128619640968,
  nome: "Posto diamante negro",
  img: " "
}, {
  lat: -21.043614786963147,
  lng: -40.82751636514811,
  nome: "Posto Eclipse",
  img: " "
}, {
  lat: -20.25150666926673,
  lng: -40.37321644585403,
  nome: "Auto Posto cariacica",
  img: " "
}, {
  lat: -19.27893908396705,
  lng: -40.088102863076855,
  nome: "Jequitiba"
}];
var image = "./img-svg/svg/logo-menor.svg";

function initMap() {
  var _ref, Map, InfoWindow, _ref2, AdvancedMarkerElement, PinElement, map, infoWindow;

  return regeneratorRuntime.async(function initMap$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(google.maps.importLibrary("maps"));

        case 2:
          _ref = _context.sent;
          Map = _ref.Map;
          InfoWindow = _ref.InfoWindow;
          _context.next = 7;
          return regeneratorRuntime.awrap(google.maps.importLibrary("marker"));

        case 7:
          _ref2 = _context.sent;
          AdvancedMarkerElement = _ref2.AdvancedMarkerElement;
          PinElement = _ref2.PinElement;
          map = new Map(document.getElementById("map"), {
            zoom: 7,
            center: {
              lat: -20.861831422377254,
              lng: -41.118637116638055
            },
            mapId: "4504f8b37365c3d0"
          }); // Create an info window to share between markers.

          infoWindow = new InfoWindow(function () {}); // Create the markers.

          cordsPostos.forEach(function (position, i) {
            var pin = new PinElement({});
            var marker = new AdvancedMarkerElement({
              position: position,
              map: map,
              content: pin.element
            });
            console.log(position.nome); // Add a click listener for each marker, and set up the info window.

            marker.addListener("click", function (_ref3) {
              var domEvent = _ref3.domEvent,
                  latLng = _ref3.latLng;
              var target = domEvent.target; //   content that show when you click em pin/markes

              var contentString = '<div style="height: 100%;">' + "<h1>" + position.nome + "</h1>" + "<img src=" + +' alt="" style="width: 400px;">' + "</div>";
              infoWindow.setContent(contentString); //   infoWindow.setIcon();

              infoWindow.open({
                anchor: marker,
                map: map
              });
            });
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}

initMap();
window.initMap = initMap();