//Initialise the map 
var map = L.map('map').setView([0, 0], 2);

//Get latitude and longitude and move the icon every 3 seconds
function moveISS() {

    var url = 'https://api.wheretheiss.at/v1/satellites/25544';
    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            var lat = data['latitude'].toFixed(4);
            var lon = data['longitude'].toFixed(4);
            document.getElementById('mapdata').innerHTML = '<ul><li>LATITUDE: ' + lat + '</li><li>LONGITUDE: ' + lon + '</li></ul>';

            iss.setLatLng([lat, lon]);
            isscirc.setLatLng([lat, lon]);
            map.panTo([lat, lon], animate = true);
        });
    setTimeout(moveISS, 3000);
}

//Set map background
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.satellite',
    accessToken: 'pk.eyJ1IjoiYnJlbmhvIiwiYSI6ImNqNzd5NTlqaTFrOW8zMm1qd3Iwd2hvbmIifQ.qsjc4YrCOgRDRrH8BlHLXg'
}).addTo(map);

//ISS Icon
var ISSIcon = L.icon({
    iconUrl: 'images/ISS2.png',
    iconSize: [70, 50],
    iconAnchor: [35, 15],
    popupAnchor: [50, 25],
    shadowSize: [60, 40],
    shadowAnchor: [30, 15]
});

//Icon Shadow
var iss = L.marker([0, 0], {
    icon: ISSIcon
}).addTo(map);
var isscirc = L.circle([0, 0], 2200e3, {
    color: "#fff",
    opacity: 0.3,
    weight: 1,
    fillColor: "#fff",
    fillOpacity: 0.1
}).addTo(map);

moveISS();

//Get the velocity and altitude and update every 3 seconds
function height_speed() {
    var url = 'https://api.wheretheiss.at/v1/satellites/25544';
    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            var velocity = Math.round(data['velocity']);
            var altitude = Math.round(data['altitude']);
            document.getElementById('speedData').innerHTML = '<h2>The ISS is currently travelling at ' + velocity + ' km/h at an altitude of ' + altitude + ' km</h2>';
        });
    setTimeout(height_speed, 3000);

}
height_speed();

//Display the amount of astronauts currently on board the ISS
function astronauts(){
    var url = "https://cors.io/?http://api.open-notify.org/astros.json";

    fetch(url)
    .then(function (res) {
        mode: 'no-cors'
        return res.json()
    })
    .then(function (data) {
        var numbers = document.getElementById('number');
        numbers.innerHTML = '<h2 class="text-center">There are ' + data['number'] + ' astronauts on board the ISS right now</h2>';

        data['people'].forEach(function (data) {
            var names = document.getElementById('names');
            var name = '<li class="text-center">' + data['name'] + '</li>';
            names.insertAdjacentHTML('beforeend', name);
        });

    });
}

astronauts();
