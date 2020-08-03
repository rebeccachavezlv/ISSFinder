const issInfo = () => {
    fetch('http://api.open-notify.org/iss-now.json')
        .then(response => response.json())
        .then(result => document.getElementById('placeCoords').innerHTML = 'Latitude: ' + result.iss_position.latitude + '<br>Longitude: ' + result.iss_position.longitude
        )
    fetch('http://api.open-notify.org/astros.json')
        .then(response => response.json())
        .then(result => {
            const peopleArray = result.people;
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