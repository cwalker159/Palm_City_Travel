

const ticket_api = "4Js5FI6dBx6yCjYyLtYNgDAZE5PVJe6i";
const eventResults = document.getElementById('event_results');


ticketApi();



function ticketApi(){
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?stateCode=NY&apikey=${ticket_api}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data._embedded.events);
        console.log('https://s1.ticketm.net/dam/a/a0a/5c204f25-e735-4c39-aeeb-970531f40a0a_1649061_TABLET_LANDSCAPE_LARGE_16_9.jpg')
        console.log(data._embedded.events[0].images[0].url)

        for(let i = 0; i<3; i++){
           
            testImgUrl = data._embedded.events[i].images[i].url;
    
            const colDiv = document.createElement('div');
            colDiv.classList.add('col');
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
    
            colDiv.appendChild(cardDiv);
    
            const img = document.createElement('img');
            img.setAttribute('src', testImgUrl);
            eventResults.appendChild(img);
            img.classList.add('card-img-top')
    
            cardDiv.appendChild(img);
    
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body')
            cardDiv.appendChild(cardBody);
    
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.innerText = data._embedded.events[i].name;
            cardBody.appendChild(cardTitle);
    
            eventResults.appendChild(colDiv);
        }

        
    })
}