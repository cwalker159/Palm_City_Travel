const ticket_api = "4Js5FI6dBx6yCjYyLtYNgDAZE5PVJe6i";
const eventResults = document.getElementById("event_results");
const searchForm = document.getElementById("search_form");
const searchInput = document.getElementById("search_input");
const breweriesResults = document.getElementById("breweries_results");
const restaurantResults = document.getElementById("restaurant_results");
const api_key =
  "7WdpoAlKL0j_ELY13HRYgMbruPV-CKw2Ez5dkzjzK7kq5HGUmqIm5PK7zTmhnWyIe8SjsrnuFq9QsI2iq5xOQI5J0V960IdOhdEzPaj3SejU8F8aH5sis43MR4kfY3Yx";
const api_url = encodeURI(
  "https://api.yelp.com/v3/businesses/search?term=restaurants&location=miami"
);
const trendingPlaces = document.getElementById("trending_places");
const restButtons = document.getElementById("restButton");
const miamiButtons = document.getElementById("miamiButton");
const newyorkButtons = document.getElementById("newyorkButton");

restButtons.addEventListener("click", (event) => {
  event.preventDefault();

  if (eventResults.childNodes) {
    eventResults.innerText = "";
    breweriesResults.innerText = "";
    restaurantResults.innerText = "";
  }

  ticketApi("Las Vegas");
  beerApi("Las Vegas");
  yelpApi("Las Vegas");
});

miamiButtons.addEventListener("click", (event) => {
  event.preventDefault();

  if (eventResults.childNodes) {
    eventResults.innerText = "";
    breweriesResults.innerText = "";
    restaurantResults.innerText = "";
  }

  ticketApi("Miami");
  beerApi("Miami");
  yelpApi("Miami");
});

newyorkButtons.addEventListener("click", (event) => {
  event.preventDefault();

  if (eventResults.childNodes) {
    eventResults.innerText = "";
    breweriesResults.innerText = "";
    restaurantResults.innerText = "";
  }

  ticketApi("New York");
  beerApi("New York");
  yelpApi("New York");
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (eventResults.childNodes) {
    restaurantResults.innerHTML = "";
    eventResults.innerHTML = "";
    breweriesResults.innerHTML = "";
  }

  const location = searchInput.value;

  if (location.length === 0) {
    alert("Please enter a valid city name");
  } else {
    ticketApi(location);
    beerApi(location);
    yelpApi(location);
  }

  searchInput.value = "";
});

// Yelp API

function yelpApi(locationName) {
  fetch(
    `https://cors-enabler-ns.herokuapp.com/bypass-cors?apiKey=${api_key}&apiUrl=https://api.yelp.com/v3/businesses/search?term=restaurants&location=${locationName}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      
 
      for (let i = 0; i < 3; i++) {
        const ImgUrl = data.businesses[i].image_url;
        const name = data.businesses[i].name;
        const phone = data.businesses[i].phone;
        createCards(name, ImgUrl, restaurantResults, phone);
      }
    });
}

// Tickeymaster API

function ticketApi(locationName) {
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?city=${locationName}&apikey=${ticket_api}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data._embedded) {
        eventResults.innerText = "No events found for this location. Please enter another location.";
        eventResults.setAttribute("style", "padding: 25px; font-size: 25px;");
      }
      for (let i = 0; i < 3; i++) {
        const ImgUrl = data._embedded.events[i].images[i].url;
        const name = data._embedded.events[i].name;
        const phone = "";
        createCards(name, ImgUrl, eventResults, phone);
      }
    });
}

// Beer API
function beerApi(locationName) {
  let imgLinks = [
    "./images/dovi-rfOFRwKHtJM-unsplash.jpg",
    "./images/josh-olalde-5PGp5nDOKxI-unsplash.jpg",
    "./images/sal-gh-4GuDoPLA8G0-unsplash.jpg",
  ];

  fetch(`https://api.openbrewerydb.org/breweries?by_city=${locationName}`)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      if (data.length === 0) {
        breweriesResults.innerText = "No breweries found for this location. Please enter another location.";
        breweriesResults.setAttribute(
          "style",
          "padding: 25px; font-size: 25px;"
        );
      }
      for (let count = 0; count < 3; count++) {
        // const imgUrl =
        //   "https://images.unsplash.com/photo-1555658636-6e4a36218be7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
        const name = data[count].name;
        const phone = "";
        createCards(name, imgLinks[count], breweriesResults, phone);
      }
    });
}

function createCards(name, imgUrl, container, phone) {
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

  if (phone.length !== 0) {
    const cardPhone = document.createElement("p");
    const atag = document.createElement('a');
    atag.setAttribute('href', `tel:${phone}`)
    cardPhone.classList.add("card-text");
    cardPhone.innerText =  "Phone: ";
    atag.innerText = phone;
    cardPhone.appendChild(atag);
    cardBody.appendChild(cardPhone);
  }

  container.appendChild(colDiv);
}
