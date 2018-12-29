// ======================================================================================
// Ajax LOGIC
// ======================================================================================
// array of top 10 movies and to be displayed when page loads
let topMovies = [
    "Aquaman",
    "Pulp+Fiction",
    "Casablanca",
    "Mary+Poppins+Returns",
    "The+Grinch",
    "How+The+Grinch+Stole+Christmas",
    "Venom",
    "The+House+With+A+Clock+In+Its+Walls",
    "The+Godfather",
    "Avengers+Infinity+Wars"
];
// initialize a movie name var to be recieved from submit
let movieName = "";

function movieAjax() {
    let ombdAPIkey = "apikey=trilogy";
    let ombdQueryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&" + ombdAPIkey;

    $.ajax({
        url: ombdQueryURL,
        method: "GET",
        dataType: "json"
    }).then(function (resp) {
        // confirm there is data received
        console.log(`ombd results:`);
        console.log(ombdQueryURL);
        console.log(resp);

        // add the results to the HTML page
        displayMovie(resp);
    });
}

// function for running the carousel Ajax function
function runCarousel() {
    for (i in topMovies) {
        movieName = topMovies[i]
        let ombdAPIkey = "apikey=trilogy";
        let ombdQueryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&" + ombdAPIkey;

        $.ajax({
            url: ombdQueryURL,
            method: "GET",
            dataType: "json"
        }).then(function (resp) {
            // confirm there is data received
            console.log(`ombd results:`);
            console.log(ombdQueryURL);
            console.log(resp);

            // add the results to the HTML page
            carouselAjax(resp);
        });
    };
}

// function for dynamically apply the carousel items
function carouselAjax(data) {
    console.table(data);
    for (let i = 0; i < data.length; i++) {
        // make the carousel anchor tag
        let carouselItem = $("<a>").addClass("carousel-item").attr("href", "#one!");

        // make the the image tag
        let image = $("<img>").addClass("modal-trigger").attr("src", data[i].poster).attr("href", "#modal"+i);

        // make the drop box
        let modal = $("<div>").addClass("modal").attr("id", "modal"+i);
        let title = $("<p>").addClass("card-title activator grey-text text-darken-4").attr("id", "title").text(data[i].Title);
        modal.append(title);

        // put the content on the DOM
        carouselItem.append(image);
        carouselItem.append(dropBox);
        $("#carousel").append(carouselItem);
        $("#modalArea").append(modal);
    }
};

// function to display a single movie
function displayMovie(data) {
    console.table(data);
    for (let i = 0; i < data.length; i++) {
        // make the card div
        let column = $("<div>").addClass("col s6 m6");
        let card = $("<div>").addClass("card medium");

        // make the div for the image
        let cardImage = $("<div>").addClass("card-image waves-effect waves-block waves-light");
        let image = $("<img>").addClass("activator").attr("src", data[i].poster);
        let fav = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red").attr("href", "#");
        let favicon = $("<i>").addClass("material-icons favorites").text("star");
        fav.append(favicon);
        cardImage.append(image);
        cardImage.append(fav);

        // make the card content
        let cardContent = $("<div>").addClass("card-content");
        let title = $("<p>").addClass("card-title activator grey-text text-darken-4").text(data[i].Title);
        let link = $("<a>").attr("href", data[i].source_url).text("Get the recipe!");
        cardContent.append(title);
        cardContent.append(link);

        // put the content on the DOM
        card.append(cardImage);
        card.append(cardContent);
        column.append(card);
        $("#recipe-results").append(column);
    }
};

// ======================================================================================
// GEOLOCATION LOGIC
// ======================================================================================
// function that checks to see if GPS capability is available and then create the map
function getLocation() {
    event.preventDefault();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // set the values of the location
            myLat = parseFloat(position.coords.latitude);
            myLong = parseFloat(position.coords.longitude);
            $("#coord").html("Latitude: " + myLat + "<br>Longitude: " + myLong);

            // adds the map to the site
            mapboxgl.accessToken = 'pk.eyJ1Ijoid2lucGlsZGV1IiwiYSI6ImNqcDJzbnd1aDAwam8zd3BlejczaWwxa2EifQ.bLD5Bdgv8hiiXbaAIqjLdA';
            map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v10',
                zoom: 13,
                center: [myLong, myLat]
            });
            map.addControl(new mapboxgl.NavigationControl());
        });
    } else {
        $("#coord").text("Geolocation is not supported by this browser.");
    }
}

// ======================================================================================
// Document LOGIC
// ======================================================================================
// function to get the information from submit button
$("#submit-movie").on("click", function (event) {
    // stop the default behavior
    event.preventDefault();

    // grab the movie-name for the query
    movieName = $("#movie-name").val().trim();

    // show the results area
    // $("#recipes").css("display", "block");
    // $("#restaurants").css("display", "block");

    // run the ajax calls
    movieAjax();
});

$("#submit").on("click", function (event) {
    // stop the default behavior
    event.preventDefault();

    // grab the information from the form for Movie review data and store it in variables.
    var newReview = {
        title: $("#title").val(),
        year_released: $("#year-released").val(),
        movie_img_html: $(""),
        rating: $("#test5").val(),
        review: $("#review").val().trim()
      };
      
      // Send the POST request.
      $.ajax("/api/movies", {
        type: "POST",
        data: newReview
      }).then(
        function() {
          console.log("created new movie rating");
          // Reload the page to get the updated list
          location.reload();
        }
      );
      
      var newUser = {
        name: $("name").val().trim(),
        age: $("age").val().trim()
      };
      
      $.ajax("/api/users", {
        type: "POST",
        data: newUser
      }).then(
        function() {
          console.log("created new user");
          // Reload the page to get the updated list
          location.reload();
        }
      );

});

// run the function for the carousel
runCarousel();

// function to run getloction if loc button is clicked
$("#loc").on("click", getLocation);