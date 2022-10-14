let map;
let inputsearch = document.querySelector("input[type=search]");
var lastMarker = undefined;

const biocoops = [
  ["Biocoop Totem", 45.763701887474326, 4.872432655541532],
  ["Biocoop des Gratte-Ciel", 45.770033179527005, 4.880908404096317],
  ["Biocoop Brotteaux", 45.76446470833227, 4.858061224853369],
  ["Biocoop Vendôme", 45.76021908147986, 4.84695598622961],
  ["Biocoop Lyon Bellecour", 45.758373259563854, 4.833401324853163],
  ["Biocoop Saxe Gambetta", 45.753350016679384, 4.846320652006437],
  ["BIOGONE", 45.77419831096457, 4.870022269033802],
  ["BIOCOOP LUMIERE", 45.746667050226, 4.867494595986968],
  ["BIOCOOP CONFLUENCE", 45.746050971380946, 4.82334699786888],
  ["BIOCOOP DU GROS CAILLOU", 45.775134990841174, 4.83336599601767],
  ["BIOCOOP LES TERREAUX", 45.76742921568201, 4.8310723555416635],
  ["BIOCOOP VALMY", 45.775762879435526, 4.803806647420474]
];


function initMap() {

  const center = { lat: 45.77005779503338, lng: 4.848127058731894 };
  const defaultBounds = {
    north: center.lat + 0.0426,
    south: center.lat - 0.0426,
    east: center.lng + 0.0426,
    west: center.lng - 0.0426,
  };

  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 12,
    disableDefaultUI: true
  });

  var Autocomplete = new google.maps.places.Autocomplete(inputsearch, {
    componentRestrictions: {
      country: ["FR"]
    },
    types: ["address"],
    bounds: defaultBounds,
    strictBounds: true
  });

  Autocomplete.addListener("place_changed", function () {
    let results = Autocomplete.getPlace()
    var latitude = results.geometry.location.lat();
    var longitude = results.geometry.location.lng();
    console.log("lat: " + latitude + " long: " + longitude);
    const myLatLng = { lat: latitude, lng: longitude };

    if (lastMarker !== undefined) {
      lastMarker.setMap(null);
    }

    lastMarker = new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });

  });

  setMarkers(map);
}

function setMarkers(map) {

  const image =
    "./Ressources/images/maps icon.png";

  for (let i = 0; i < biocoops.length; i++) {
    const biocoop = biocoops[i];

    new google.maps.Marker({
      position: { lat: biocoop[1], lng: biocoop[2] },
      map,
      title: biocoop[0],
      zIndex: biocoop[3],
      icon: image
    });
  }
}

var btn = document.querySelectorAll(".select__boxbutton button");
var boxswitch = document.querySelector(".select__switch");
var boxnumber = 1;

function switchbox() {
  btn.forEach(element =>
    element.classList.toggle("inactive")
  );
  if (boxnumber == 1) {
    boxswitch.style.transform = "translate(-100vw,0)"
    boxnumber = 2;
  } else {
    boxswitch.style.transform = "translate(0,0)"
    boxnumber = 1;
  }
}