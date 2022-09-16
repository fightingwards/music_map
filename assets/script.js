// Seat Geek
// const clientId   = 'MjkwNzYwNjh8MTY2MzA4MjYzNi4yNDI1OTEx';                              // John's ID
// const seatSecret = 'c0c6077e57c5b2704b0249ea93b976cad9ab01c4b6e98f47231b108372000adc';  // John's secret (not using below)
const clientId   = 'MjkxMzI3NzV8MTY2MzI4MDQwOS43NDkyNzU';                              // John's ID
const seatSecret = 'e57892ed7adab15857fda6a3fd6e57133c76c3bfb9236a716571804bc9fc5b16';  // John's secret (not using below)


const seatGeek   = 'https://api.seatgeek.com/2/'                                        // seat geek api url

var newButton    = document.getElementById('newButton');                                // grab button

var secondSuperAwesome = function secondUserValue() {
    var userInput = document.getElementById('userInput').value;                        
    console.log(userInput);                                                            

    fetch(seatGeek+'venues?city='+userInput+'&client_id='+clientId)                     // fetch the venue api                 

    .then(function (response) {
        if(!response.ok) {
            throw response.json();
        }
        return response.json();
    }) 

    .then(function (locRes) {
        
        var resultCity = locRes.venues[0].display_location;
        // var resultName;
        // var resultImg; 
        // var resultLoc = locRes.venues[0].name_v2;
        // var resultDate;
        // var resultTime;
        
        $('#resultCity').html(resultCity);
        // $('#resultName').html(resultName);
        // $('#resultImg').html(resultImg);
        // $('#resultLoc').html(resultLoc);
        // $('#resultDate').html(resultDate);
        // $('#resultTime').html(resultTime);
        
        console.log(locRes.venues);                  // added .venues -elena
                                                     // code added by elena
        locRes.venues.forEach((i) => {
            console.log(i)

            const nName = i.name_v2;
            const capacity = i.capacity;
            const nStreet = i.address;
            const nZip = i.extended_address;
        
            $('#vName').html(nName);
            $('#capacity').html(capacity);
            $('#vStreet').html(nStreet);
            $('#vZip').html(nZip);
        
        });
    })                                                              
}

newButton.addEventListener("click", secondSuperAwesome);
