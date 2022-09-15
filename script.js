const ticket_api = "4Js5FI6dBx6yCjYyLtYNgDAZE5PVJe6i";
const eventResults = document.getElementById("event_results");
const searchForm = document.getElementById("search_form");
const searchInput = document.getElementById("search_input");
const breweriesResults = document.getElementById("breweries_results");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (eventResults.childNodes) {
    eventResults.innerHTML = "";
    breweriesResults.innerHTML = "";
  }

  const location = searchInput.value;
  ticketApi(location);
  beerApi(location);
  searchInput.value = "";
});

function ticketApi(locationName) {
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?city=${locationName}&apikey=${ticket_api}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data._embedded.events[0].images[0].url);

      for (let i = 0; i < 3; i++) {
        const ImgUrl = data._embedded.events[i].images[i].url;
        const name = data._embedded.events[i].name;
        createCards(name, ImgUrl, eventResults);
      }
    });
}

function beerApi(locationName) {
  let imgLinks = [
    "./images/dovi-rfOFRwKHtJM-unsplash.jpg",
    "./images/louis-hansel-WCm4dFvZnMM-unsplash (1).jpg",
    "./images/sal-gh-4GuDoPLA8G0-unsplash.jpg",
  ];

  fetch(`https://api.openbrewerydb.org/breweries?by_city=${locationName}`)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      for (let count = 0; count < 3; count++) {
        // const imgUrl =
        //   "https://images.unsplash.com/photo-1555658636-6e4a36218be7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
        const name = data[count].name;
        createCards(name, imgLinks[count], breweriesResults);
      }
    });
}

function createCards(name, imgUrl, container) {
  const colDiv = document.createElement("div");
  colDiv.classList.add("col");
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  colDiv.appendChild(cardDiv);

  const img = document.createElement("img");
  img.setAttribute("src", imgUrl);
  eventResults.appendChild(img);
  img.classList.add("card-img-top");

  cardDiv.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardDiv.appendChild(cardBody);

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = name;
  cardBody.appendChild(cardTitle);

  container.appendChild(colDiv);
}
