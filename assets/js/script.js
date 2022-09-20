// Seat Geek
const clientId   = 'MjkwNzYwNjh8MTY2MzA4MjYzNi4yNDI1OTEx';                              // my ID
const seatSecret = 'c0c6077e57c5b2704b0249ea93b976cad9ab01c4b6e98f47231b108372000adc';  // my secret (not using below)
const seatGeek   = 'https://api.seatgeek.com/2/events?venue.city=';                                        // seat geek api url
const concerts   = '&taxonomies.name=concert';

// Google Maps Geolocation API

const google_clientID = 'AIzaSyDtXV5-Kqkz5NrfGqcN7GlNbdP5DYRhG8Y';
const googleMaps = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

// testing endpoints

const events = 'austin&taxonomies.name=concert&client_id=MjkwNzYwNjh8MTY2MzA4MjYzNi4yNDI1OTEx';

// my link= seatGeek+'venues?city='+userInput+'&client_id='+clientId
// end testing of endpoints

var newButton    = document.getElementById('newButton');                                // grab button

var secondSuperAwesome = function secondUserValue() {
    
    var userInput = document.getElementById('userInput').value;                        
    console.log(userInput);                                                            

    fetch(seatGeek+userInput+concerts+'&client_id='+clientId)                     // fetch the venue api                 

    .then(function (response) {
        if(!response.ok) {
            throw response.json();
        }
        return response.json();
    }) 

    .then(function (locRes) {

        var resultCity = locRes.events[0].venue.display_location;
        var resultName = locRes.events[0].title;
        var resultImg = locRes.events[0].performers[0].image
        var resultLoc = locRes.events[0].venue.name+', '+locRes.events[0].venue.address+' '+resultCity;
        var resultAddress = locRes.events[0].venue.address;
        //var resultLatLng = locRes.events[0].venue.location;
        var resultLat = locRes.events[0].venue.location.lat;
        var resultLon = locRes.events[0].venue.location.lon;
        var resultDate = locRes.events[0].datetime_local;
        var purchaseTickets = locRes.events[0].url;
      
        $('#resultCity').html(resultCity);
        $('#resultName').html(resultName);
        $('#resultImg').html(resultImg);
        $('#resultLoc').html(resultLoc);
        $('#resultAddress').html(resultAddress);
        //$('#resultLatLon').html(resultLatLon);
        $('#resultLat').html(resultLat);
        $('#resultLon').html(resultLon);
        $('#resultDate').html(resultDate);
        $('#purchaseTickets').html(purchaseTickets);

        fetch(googleMaps+resultLat+','+resultLon+'&key='+google_clientID)
        .then(response => response.json())
        .then(data => {
          for(let i = 0; i < 10; i++){
            createMarker(data.results[i].geometry.location)
          }
        })
    })
}

newButton.addEventListener("click", secondSuperAwesome);                                     // on click on the button then run the superAwesome function

let map, infoWindow;
    
    function initMap(){
        map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: { lat: 30.266666, lng: -97.733330},
        });
    }

  function createMarker(place) {
   const marker = new google.maps.Marker({
      position: place,
      map,
      title: "Test"
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

// Google map with geolocator api
/* function initMap() {
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
} */

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