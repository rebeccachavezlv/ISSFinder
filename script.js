const issInfo = () => {
    fetch('https://lit-temple-91342.herokuapp.com/')
        .then(response => response.json())
        .then(result => {
            document.getElementById('placeCoords').innerHTML = 'Latitude: ' + result.location.latitude + '<br>Longitude: ' + result.location.longitude;
            var mymap = L.map('mapid').setView([result.location.latitude, result.location.longitude], 2);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoicmViZWNjYWNoYXZlemx2IiwiYSI6ImNrZTRlaDRzYzBzYXQyc21xYWViamF4d2YifQ.2kGwr_kzrmAD7USV7ajfeA'        
            }).addTo(mymap);
            var myIcon = L.icon({
                iconUrl: 'spaceship.png',
                iconSize: [35, 35],
            });
            var marker = L.marker([result.location.latitude, result.location.longitude],{icon: myIcon}).addTo(mymap);
        }
        )
    fetch('https://lit-temple-91342.herokuapp.com/')
        .then(response => response.json())
        .then(result => {
            const peopleArray = result.astros;
            document.getElementById("placeAstros").innerHTML = "";
            for (i = 0; i < peopleArray.length; i++){
                const li = document.createElement("li");
                let textNode = document.createTextNode(peopleArray[i].name);
                li.appendChild(textNode);
                document.getElementById("placeAstros").appendChild(li);      
            }
        }
    )
}
    
locationButton.addEventListener("click", () => {
    issInfo();
})



