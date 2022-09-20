// Seat Geek
const clientId   = 'MjkwNzYwNjh8MTY2MzA4MjYzNi4yNDI1OTEx';                              // my ID
const seatSecret = 'c0c6077e57c5b2704b0249ea93b976cad9ab01c4b6e98f47231b108372000adc';  // my secret (not using below)
const seatGeek   = 'https://api.seatgeek.com/2/events?venue.city=';                                        // seat geek api url
const concerts   = '&taxonomies.name=concert';
const events     = 'austin&taxonomies.name=concert&client_id=MjkwNzYwNjh8MTY2MzA4MjYzNi4yNDI1OTEx';

var newButton    = document.getElementById('newButton'); 

var cityFromLs   = localStorage.getItem('City');

var favs        = [];
var quickSearch = document.getElementById('quickSearch');

function secondSuperAwesome() {
    var userInput = document.getElementById('userInput').value;
    fetch(seatGeek+userInput+concerts+'&client_id='+clientId)                     // fetch the venue api                 

    .then(function (response) {
        if(!response.ok) {
            throw response.json();
        }
        return response.json();
    }) 

    .then(function (locRes) {

        var resultCity      = locRes.events[0].venue.display_location;
        var resultName      = locRes.events[0].title;
        var resultImg       = locRes.events[0].performers[0].image
        var resultLoc       = locRes.events[0].venue.name+', '+locRes.events[0].venue.address+' '+resultCity;
        var resultDate      = locRes.events[0].datetime_local;
        var purchaseTickets = locRes.events[0].url;
      
        $('#resultCity').html(resultCity);
        $('#resultName').html(resultName);
        $('#resultImg').html(resultImg);
        $('#resultLoc').html(resultLoc);
        $('#resultDate').html(resultDate);
        $('#purchaseTickets').html(purchaseTickets);
       
        console.log(locRes.events)
    }) 
}

$('#newButton').on("click", function (){
  // write the user input to the list item 
  var userInput =  document.getElementById('userInput').value;
  var quickKey = $(this).parent().siblings('#quickList').children(('#1'));
  console.log(quickKey.attr('id'));
  quickKey.html(userInput);

  // setting the entered text in local storage
  localStorage.setItem(quickKey.attr('id'), userInput);

  secondSuperAwesome();
})

// getting the value from localstorage and setting the li to that value
for (var i = 1; i < 5; i++) {
  var li = $(`#${i}`).html(localStorage.getItem(i));
  li.on("click", secondSuperAwesome); // on click of the newly created li re-run the superAwesome function
};

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