"use strict";

var _postos = require("./postos.js");

// AIzaSyB46wG7bMX070nj2Avrb24R-R7F5ihAfwM
var CepInput = document.getElementById("CepInput");
var btnPesquisarCep = document.getElementById("btnPesquisarCep");
var geocoder;
var directionsService;
var directionsRenderer;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var cordsLocal = {
      lat: latitude,
      lng: longitude
    };

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
                zoom: 10,
                center: cordsLocal,
                mapId: "4504f8b37365c3d0"
              });
              infoWindow = new InfoWindow(function () {});

              _postos.cordsPostos.forEach(function (position, i) {
                var pin = new PinElement({});
                var marker = new AdvancedMarkerElement({
                  position: position,
                  map: map,
                  content: pin.element
                });
                marker.addListener("click", function (_ref3) {
                  var domEvent = _ref3.domEvent,
                      latLng = _ref3.latLng;
                  var mapaURL = 'https://www.google.com/maps?q=' + position.lat + ',' + position.lng;
                  window.location.href = mapaURL;
                });
              });

              btnPesquisarCep.addEventListener("click", function () {
                geocoder = new google.maps.Geocoder();
                directionsService = new google.maps.DirectionsService();
                directionsRenderer = new google.maps.DirectionsRenderer({
                  map: map
                });
                var cep = CepInput.value;

                function focusOnLocation(cep, map) {
                  geocoder.geocode({
                    address: cep
                  }, function (results, status) {
                    console.log("Geocoding Response:", results, status);

                    if (status === "OK" && results[0]) {
                      var location = results[0].geometry.location;
                      map.setCenter(location);
                      findClosestMarker(location);
                    } else {
                      alert("CEP não encontrado. Verifique o CEP e tente novamente.");
                    }
                  });
                }

                focusOnLocation(cep, map);
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      });
    }

    initMap();
    window.initMap = initMap();
  });
} else {
  // O navegador não suporta a Geolocation API
  console.log("Geolocalização não suportada neste navegador.");
}

function findClosestMarker(userLocation) {
  var closestMarker = null;
  var closestDistance = Infinity;

  _postos.cordsPostos.forEach(function (position) {
    var markerLocation = new google.maps.LatLng(position.lat, position.lng);
    var distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation, markerLocation);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestMarker = position;
    }
  });

  console.log("Closest Marker:", closestMarker, "Distance:", closestDistance);

  if (closestMarker) {
    calculateAndDisplayRoute(userLocation, closestMarker.position);
  }
}

function calculateAndDisplayRoute(start, end) {
  var request = {
    origin: start,
    destination: new google.maps.LatLng(end.lat, end.lng),
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function (result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
    }
  });
}