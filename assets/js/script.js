// Seat Geek
const clientId = 'MjkwNzYwNjh8MTY2MzA4MjYzNi4yNDI1OTEx'; // my ID
const seatSecret =
  'c0c6077e57c5b2704b0249ea93b976cad9ab01c4b6e98f47231b108372000adc'; // my secret (not using below)
const seatGeek = 'https://api.seatgeek.com/2/events?venue.city='; // seat geek api url
const concerts = '&taxonomies.name=concert';

// Google Maps Geolocation API

const google_clientID = 'AIzaSyDtXV5-Kqkz5NrfGqcN7GlNbdP5DYRhG8Y';
const googleMaps = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

const events =
  'austin&taxonomies.name=concert&client_id=MjkwNzYwNjh8MTY2MzA4MjYzNi4yNDI1OTEx';

var newButton = document.getElementById('newButton'); // grab button

let map, infoWindow; // Map variables

let eventList = $('#resultRow');

function secondSuperAwesome() {
  var userInput = document.getElementById('userInput').value;
  let bandsHTML = '';

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

      $('#resultCity').html(resultCity);

      let index = 0;
      // elena's code
      locRes.events.forEach((i) => {
        const band = i.title;
        const pic = i.performers[0].image;
        const dt = i.datetime_local.split('T').slice(0);
        const venue = i.venue.name_v2;
        const local = i.venue.address + '<br>' + i.venue.extended_address;
        const tickets = i.url;

        bandsHTML =
          bandsHTML +
          `
            <div class="column container is-full-mobile is-one-third-tablet one-quarter-desktop is-flex is-flex-wrap-wrap is-justify-content-center">
              <div id="save-${index}"><i class="fa-regular fa-heart favSave${index} mr-1"></i></div>
              <div id="evtBand" class="band">${band}</div>
              <div id="bandImg"><img src="${pic}" alt="picture of band"></div>
              <div id="evtDate">Date: ${dt[0]}</div> 
              <div id="evtTime">Time: ${dt[1]}</div>
              <div id="evtVenue">At ${venue}</div>
              <div class="mb-3" id="evtLocation">Located:<br>${local}
              <br><a id="evtTickets" href="${tickets}">Click here for Tickets!</a></div>
            </div>
          `;
        index++;
      });

      eventList.html(bandsHTML);

      function handleSave() {
        $(this).removeClass('fa-regular').addClass('fa-solid');

        var favBand = $(this).parent().siblings('.band')[0].firstChild.data;
        var favKey = $(this).parent().attr('id');

        // set local storage to the key and band name
        localStorage.setItem(favKey, favBand);

        displaySavedFav();
      }

      $('.favSave0').on('click', handleSave);
      $('.favSave1').on('click', handleSave);
      $('.favSave2').on('click', handleSave);
      $('.favSave3').on('click', handleSave);
      $('.favSave4').on('click', handleSave);
      $('.favSave5').on('click', handleSave);
      $('.favSave6').on('click', handleSave);
      $('.favSave7').on('click', handleSave);
      $('.favSave8').on('click', handleSave);
      $('.favSave9').on('click', handleSave);

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
}

// getting the value from localstorage and setting the li to that value
function displaySavedFav() {
  for (var i = 0; i < 10; i++) {
    $(`#ql-${i}`).html(localStorage.getItem(`save-${i}`));
  }
}

displaySavedFav();

newButton.addEventListener('click', secondSuperAwesome); // on click on the button then run the superAwesome function

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

  var infowindow = new google.maps.InfoWindow({
    content: title,
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.open(map, marker);
  });
}

window.initMap = initMap;
