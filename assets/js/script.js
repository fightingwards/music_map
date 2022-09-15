// Local storage counter
function increaseCounter() {
	var count = Number(window.localStorage.getItem("count"));
	count += 1;
	window.localStorage.setItem("count", count);
	document.getElementById("total").innerHTML = count;
}

function decreaseCounter() {
	var count = Number(window.localStorage.getItem("count"));
	count -= 1;
	window.localStorage.setItem("count", count);
	document.getElementById("total").innerHTML = count;
}

function clearCounter() {
	window.localStorage.clear();
	document.getElementById("total").innerHTML = "";
}

// Geolocation data api
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
};

fetch("https://v1.nocodeapi.com/simonphd/lookup/doTeAmBZbLzsExUV", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

		console.log = function(message) {
			document.getElementById('result').innerHTML = message;
	};
	console.log('');

// Google map with geolocator api
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 30.266666, lng: -97.733330},
    zoom: 13,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;