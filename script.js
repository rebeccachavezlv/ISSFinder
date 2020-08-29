//If higher than one, marker will update instead of initialize
let counter = 0;

//CORS Anywhere
const proxyUrl = 'https://protected-lowlands-50643.herokuapp.com/'

//Loader
const loader = document.getElementById('loader');
const loaderContainer = document.getElementById('loader-container')
const infoContainer = document.getElementById('info-container')

const showLoadingSpinner = () => {
    loader.hidden = false;
    infoContainer.hidden = true;
}

const hideLoadingSpinner = () => {
    if (!loader.hidden) {
        infoContainer.hidden = false;
        infoContainer.style.visibility = "visible"; 
        loader.hidden = true;
        infoContainer.style.visibility = "visible"; 
    }
}

const hideInfoContainer = () => {
    infoContainer.style.visibility = "hidden"; 
}    

//Leaflet Map Initialize
let mymap = L.map('mapid').setView([36.1699, 115.1398], 2);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmViZWNjYWNoYXZlemx2IiwiYSI6ImNrZTRlaDRzYzBzYXQyc21xYWViamF4d2YifQ.2kGwr_kzrmAD7USV7ajfeA'        
}).addTo(mymap);

//Leaflet Map Icon
let myIcon = L.icon({
    iconUrl: 'spaceship.png',
    iconSize: [35, 35],
});


//Default starting point for marker. Hidden until map is initialized
let marker = L.marker([36.1699, 115.1398],{icon: myIcon})

//Finds location, places it on map, and updates text on page
async function findLatLong () {
    showLoadingSpinner();
    const apiUrl = 'http://api.open-notify.org/iss-now.json'
    try {
        const response = await fetch (proxyUrl + apiUrl);
        const data = await response.json();
        // Places coordinates in text
        document.getElementById('placeCoords').innerHTML = 'Latitude: ' + data.iss_position.latitude + '<br>Longitude: ' + data.iss_position.longitude;
        //Hide Loader
        hideLoadingSpinner()
        //Initializes marker on map
        if (counter === 0){
            counter++;
            mymap.flyTo([data.iss_position.latitude, data.iss_position.longitude], 2);
            marker.setLatLng([data.iss_position.latitude, data.iss_position.longitude]).update();
            marker.addTo(mymap);
            console.log('Initializing')
        } else {
            // Updates marker on map
            mymap.flyTo([data.iss_position.latitude, data.iss_position.longitude], 2);
            marker.setLatLng([data.iss_position.latitude, data.iss_position.longitude]).update();
            console.log('Updating')
        }
        return data
    } catch (error) {
        console.log (error)
    }
}

//Finds astronauts and updates text on page
async function astroInfo() {
    const apiUrl = 'http://api.open-notify.org/astros.json'
    try {
        const reponse = await fetch (proxyUrl + apiUrl);
        const data = await reponse.json();
        const peopleArray = data.people;
        //Places astronauts in text
        document.getElementById("placeAstros").innerHTML = '';
        for (i = 0; i < peopleArray.length; i++){
            const li = document.createElement("li");
            let textNode = document.createTextNode(peopleArray[i].name);
            li.appendChild(textNode);
            document.getElementById("placeAstros").appendChild(li);   
        }
     
    } catch (error) {
        console.log(error)
    }
}

//Click event

const issInfo = () => {
    findLatLong();
    astroInfo();
}

//Event Listeners
    
locationButton.addEventListener("click", () => {
    issInfo();
})

//On Load
hideLoadingSpinner();
hideInfoContainer();