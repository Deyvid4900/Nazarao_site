// AIzaSyDzixHiJAmfIEYkFwc5ysW5xF0RmmoEFRU    api key
// AIzaSyB46wG7bMX070nj2Avrb24R-R7F5ihAfwM
// lat: -20.861831422377254, lng: -41.118637116638055
// lat: -20.84100222644713, lng: -41.18210193771411
const cordsPostos = [
  { lat: -20.861831422377254, lng: -41.118637116638055 },
  { lat: -20.84100222644713, lng: -41.18210193771411 },
  { lat: -20.84289295305546, lng: -41.12330964952382 },
  { lat: -20.806676356235418, lng: -41.15651244952518 },
  { lat: -21.10271504079641, lng: -41.042290889997126 },
  { lat: -20.678359003705445, lng: -41.349042080157936 },
  { lat: -20.772324166996153, lng: -41.677827974441136 },
  { lat: -20.69391837098185, lng: -41.84916749185929 },
  { lat: -18.7463493646525, lng: -39.86130393241459 },
  { lat: -20.763236704310643, lng: -41.59164003049385 },
  { lat: -20.562696620673, lng: -41.82431129186433 },
  { lat: -20.778280667176023, lng: -41.06815942253728 },
  { lat: -20.85175905869883, lng: -41.094232307817414 },
  { lat: -20.857203590992768, lng: -41.10262594583081 },
  { lat: -20.814280438079546, lng: -41.15874144997447 },
  { lat: -20.85407148702786, lng: -41.11774863233659 },
  { lat: -20.84389240243609, lng: -41.12881863217908 },
  { lat: -20.868121929400584, lng: -41.02589251884142 },
  { lat: -20.832372559575184, lng: -42.15383419185384 },
  { lat: -18.52727635721204, lng: -39.84128619640968 },
  { lat: -21.043614786963147, lng: -40.82751636514811 },
  { lat: -20.25150666926673, lng: -40.37321644585403 },
  { lat: -19.27893908396705, lng: -40.088102863076855 },
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
