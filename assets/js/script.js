// Seat Geek
const clientId = 'MjkwNzYwNjh8MTY2MzA4MjYzNi4yNDI1OTEx'; // my ID
const seatSecret =
  'c0c6077e57c5b2704b0249ea93b976cad9ab01c4b6e98f47231b108372000adc'; // my secret (not using below)
const seatGeek = 'https://api.seatgeek.com/2/events?venue.city='; // seat geek api url
const concerts = '&taxonomies.name=concert';

// Google Maps Geolocation API

const google_clientID = 'AIzaSyDtXV5-Kqkz5NrfGqcN7GlNbdP5DYRhG8Y';
const googleMaps = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

// testing endpoints

const events =
  'austin&taxonomies.name=concert&client_id=MjkwNzYwNjh8MTY2MzA4MjYzNi4yNDI1OTEx';

// my link= seatGeek+'venues?city='+userInput+'&client_id='+clientId
// end testing of endpoints

var newButton = document.getElementById('newButton'); // grab button

var secondSuperAwesome = function secondUserValue() {
  var userInput = document.getElementById('userInput').value;
  console.log(userInput);

  fetch(seatGeek + userInput + concerts + '&client_id=' + clientId) // fetch the venue api
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })

    .then(function (locRes) {
      var resultCity = locRes.events[0].venue.display_location;
      var resultLat = locRes.events[0].venue.location.lat;
      var resultLon = locRes.events[0].venue.location.lon;

      var resultCity = locRes.events[0].venue.display_location;

      $('#resultCity').html(resultCity);

      console.log(locRes.events);

      // elena's code
      locRes.events.forEach((i) => {
        const band = i.title;
        const pic = i.performers[0].image;
        const date = i.datetime_local.split('T').slice(0);
        const time = i.datetime_local.split('T').slice(1);
        const venue = i.venue.name_v2;
        const local = i.venue.address + '<br>' + i.venue.extended_address;
        const tickets = i.url;

        $('#resultRow').append(`
          <img src="${pic}" alt="picture of band">
          <p>${band}<p>
          <p>Date: ${date}<p> 
          <p>Time: ${time}<p>
          <p>At ${venue}<p>
          <p>Located:<br>${local}
          <br><a href="${tickets}">Click here for Tickets!</a>
          `);
      });

      fetch(
        googleMaps + resultLat + ',' + resultLon + '&key=' + google_clientID,
      )
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < 10; i++) {
            createMarker(
              data.results[i].geometry.location,
              locRes.events[i].title,
            );
          }
        });
    });
};

newButton.addEventListener('click', secondSuperAwesome); // on click on the button then run the superAwesome function

let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: { lat: 30.266666, lng: -97.73333 },
  });
}

function createMarker(place, title) {
  const marker = new google.maps.Marker({
    position: place,
    map,
    title: title,
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

window.initMap = initMap;
