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
        const date = i.datetime_local.split('T').slice(0);
        const time = i.datetime_local.split('T').slice(1);
        const venue = i.venue.name_v2;
        const local = i.venue.address + '<br>' + i.venue.extended_address;
        const tickets = i.url;

        bandsHTML =
          bandsHTML +
          `
          <img src="${pic}" alt="picture of band">
          <p id="save-${index}"><i class="fa-regular fa-heart favSave${index}"></i><p>
          <p class="band">${band}<p>
          <p>Date: ${date}<p> 
          <p>Time: ${time}<p>
          <p>At ${venue}<p>
          <p>Located:<br>${local}
          <br><a href="${tickets}">Click here for Tickets!</a><br>
          `;
        index++;
      });

      eventList.html(bandsHTML);

      function handleSave() {
        console.log('bam!');
        console.log(this);

        // this.removeClass('fa-regular').addClass('fa-solid'); uncaught typeerror: this.removeClass is not a function
        $(this).removeClass('fa-regular').addClass('fa-solid');
        var currentIndex = $(this).parent().attr('id').split('-')[1];

        var favBand = $(this).parent().siblings('.band')[currentIndex]
          .firstChild.data;
        console.log(favBand);
        console.log($(this).parent().siblings('.band') + ' this one');

        var favBands = $(this).parent().siblings('.band');
        console.log(favBands);

        var favKey = $(this).parent().attr('id');
        console.log(favKey);

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

// my localstorage issues
// unable to select items other than the 1st item favSave
// need a loop after above is solved
// nothing populates under favorites until after the page reloads or a 2nd search is done
// click any heart and all the hearts from the search results are changed

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
