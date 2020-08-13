const issInfo = () => {
    fetch('https://lit-temple-91342.herokuapp.com/')
        .then(response => response.json())
        .then(result => document.getElementById('placeCoords').innerHTML = 'Latitude: ' + result.location.latitude + '<br>Longitude: ' + result.location.longitude
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