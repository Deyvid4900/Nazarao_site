import {cordsPostos} from "./postos.js";
// AIzaSyB46wG7bMX070nj2Avrb24R-R7F5ihAfwM
const CepInput = document.getElementById("CepInput")
const btnPesquisarCep = document.getElementById("btnPesquisarCep")

let geocoder;
let directionsService;
let directionsRenderer;

if ("geolocation" in navigator) {

  navigator.geolocation.getCurrentPosition(function (position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;



    let cordsLocal = {
      lat: latitude,
      lng: longitude
    }


    async function initMap() {


      const { Map, InfoWindow } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
        "marker"
      );
      const map = new Map(document.getElementById("map"), {
        zoom: 10,
        center: cordsLocal,
        mapId: "4504f8b37365c3d0",
      });



      const infoWindow = new InfoWindow(() => { });


      cordsPostos.forEach((position, i) => {
        const pin = new PinElement({});
        const marker = new AdvancedMarkerElement({
          position,
          map,
          content: pin.element,
        });


        marker.addListener("click", ({ domEvent, latLng }) => {
          // const { target } = domEvent;

          // //   content that show when you click em pin/markes
          // const contentString =
          //   '<div style="height: 100%;">' +
          //   "<h1>" +
          //   position.nome +
          //   "</h1>" +
          //   "<img src=" +
          //   +' alt="" style="width: 400px;">' +
          //   "</div>";

          // infoWindow.setContent(contentString);
          // //   infoWindow.setIcon();

          // infoWindow.open({
          //   anchor: marker,
          //   map,
          // });
          var mapaURL = 'https://www.google.com/maps?q=' + position.lat + ',' + position.lng;

        
          window.location.href = mapaURL;
        });
      });
      btnPesquisarCep.addEventListener("click", () => {
        geocoder = new google.maps.Geocoder();
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer({ map });
        let cep = CepInput.value

        function focusOnLocation(cep) {
          geocoder.geocode({ address: cep }, function (results, status) {
            if (status === "OK" && results[0]) {
              const location = results[0].geometry.location;
              map.setCenter(location);
              findClosestMarker(location);
            } else {
              alert("CEP não encontrado. Verifique o CEP e tente novamente.");
            }
          });
        }
        focusOnLocation(cep);
        google.maps.event.addDomListener(window, "load", initializeMap);
      })

    }

    initMap();

    window.initMap = initMap();

  });
} else {
  // O navegador não suporta a Geolocation API
  console.log("Geolocalização não suportada neste navegador.");
}

function findClosestMarker(userLocation) {
  let closestMarker = null;
  let closestDistance = Infinity;

  cordsPostos.forEach((position) => {
    const markerLocation = new google.maps.LatLng(position.lat, position.lng);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      userLocation,
      markerLocation
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestMarker = position;
    }
  });

  if (closestMarker) {
    calculateAndDisplayRoute(userLocation, closestMarker);
  }
}

function calculateAndDisplayRoute(start, end) {
  const request = {
    origin: start,
    destination: new google.maps.LatLng(end.lat, end.lng),
    travelMode: google.maps.TravelMode.DRIVING,
  };

  directionsService.route(request, function (result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
    }
  });
}



