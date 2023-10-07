// AIzaSyDzixHiJAmfIEYkFwc5ysW5xF0RmmoEFRU    api key
// AIzaSyB46wG7bMX070nj2Avrb24R-R7F5ihAfwM
// lat: -20.861831422377254, lng: -41.118637116638055
// lat: -20.84100222644713, lng: -41.18210193771411
const cordsPostos = [
    { lat: -20.861831422377254, lng: -41.118637116638055 },
    { lat: -20.84100222644713, lng: -41.18210193771411 },
    { lat: -20.84289295305546, lng: -41.12330964952382 },
  ];
  
console.log(cordsPostos);

const parser = new DOMParser();

async function initMap() {
  // Request needed libraries.
  const image = "./img-svg/svg/logo-menor.svg";
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const map = new Map(document.getElementById("map"), {
    center: { lat: -20.861831422377254, lng: -41.118637116638055 },
    zoom: 13,
    mapId: "4504f8b37365c3d0",
  });

  

  cordsPostos.forEach((coordinate) => {
    new AdvancedMarkerElement({
      map,
      position: coordinate,
    });
  });
}

window.initMap = initMap();
