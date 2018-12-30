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
  "Avengers+Infinity+War"
];
// initialize a movie name var to be recieved from submit
let movieName = "";

// ajax functiion for a single movie
function searchMovie() {
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
  // $('.modal').modal('destroy');
  // $('.modal').modal();
}




// function for dynamically apply the carousel items
function carouselAjax(data) {
  // confirm data being recieved
  console.log(data);
  console.log(data.Title);
  console.log(data.Poster);


  // create a random number to make sure the number applied is dynamic between 1/1000 to make chance of double approx 1%
  let randomNum = Math.round(Math.random() * 1000)

  // make the carousel anchor tag
  let carouselDiv = $("<div>").addClass("carousel-item-div");
  let carouselItem = $("<a>").addClass("carousel-item").attr("href", "#");

  // make the the image tag and append it to the carousel item and the item to the carousel div
  let image1 = $("<img>").addClass("modal-trigger").attr("src", data.Poster).attr("href", "#modal" + randomNum);
  carouselItem.append(image1);
  carouselDiv.append(carouselItem)

  // make the modal
  let modal = $("<div>").addClass("modal").attr("id", "modal" + randomNum);
  let formWrap = $("<div>").addClass("formWrap col s12");
  let row1 = $("<div>").addClass("row");
  let imgWrap = $("<div>").addClass("col s4 m2 mvImgWrap");
  let image2 = $("<img>").addClass("mvImg").attr("src", data.Poster);
  let titleWrap = $("<div>").addClass("col s8 m10 mvTitle");
  let title = $("<h5>").attr("id", "title").text(data.Title);
  let yearP = $("<p>").addClass("year-released").text(data.Released)
  let formCol = $("<div>").addClass("col col s8 m10");
  let form = $("<form>").attr("action", "#");
  let sliderParagraph = $("<p>").addClass("formP").text("Use slider to rate movie");
  let slider = $("<p>").addClass("range-field").html("<input type='range' id='rating' min='0' max='100' />");
  let row2 = $("<div>").addClass("row");
  let inputField = $("<div>").addClass("input-field col s12");
  let nameField = $("<input>").addClass("validate").attr({
    placeholder: "Name (optional)",
    id: "name",
    type: "text",
  });
  let ageField = $("<input>").addClass("validate").attr({
    placeholder: "Age (required)",
    id: "age",
    type: "text",
    required: true
  });
  let reviewField = $("<textarea>").addClass("materialize-textarea").attr({
    placeholder: "Your Review (optional)",
    id: "review",
    "data-length": "255",
    maxlength: "255"
  })
  let locationButton = $("<button>").addClass("waves-effect waves-light btn locationBtn").attr("id", "locationBtn").html("<i class='material-icons right'>add_location</i>Location");
  let locationDisplay = $("<p>").attr("id", "coord");
  let submitButton = $("<button>").addClass("btn waves-effect waves-light").attr({
    id: "submitBtn",
    type: "submit",
    name: "action",
  }).html("<i class='material-icons right'>send</i>Submit");
  let modalFooter = $("<div>").addClass("modal-footer").html("<a href='#!' class='modal-close waves-effect waves-green btn-flat'>Close</a>");

  // append all data to the rows in correct order for the modal
  imgWrap.append(image2);
  title.append(yearP);
  titleWrap.append(title);
  inputField.append(nameField);
  inputField.append(ageField);
  inputField.append(reviewField);
  inputField.append(locationButton);
  inputField.append(locationDisplay);
  inputField.append(submitButton);
  row2.append(inputField)
  form.append(sliderParagraph);
  form.append(slider);
  form.append(row2)
  formCol.append(form);
  row1.append(imgWrap);
  row1.append(titleWrap);
  row1.append(formCol);
  formWrap.append(row1);
  modal.append(formWrap);
  modal.append(modalFooter);

  // put the content on the DOM
  console.log(carouselDiv.html());
  $('.carousel').append(carouselDiv);
  $('.carousel').carousel();
  $("#carousel-container").append(modal);
  $('.modal').modal();
  $('.modal').modal('destroy');
  $('.modal').modal();
  $('input#input_text, textarea#review').characterCounter();
  console.log("this ran")
};

// function to display a single movie
function displayMovie(data) {
  console.table(data);
  // verify the user inputed a movie title that could be found
  if (data) {
    // make the form div
    let formWrap = $("<div>").addClass("formWrap col s12");
    let row1 = $("<div>").addClass("row");
    let imgWrap = $("<div>").addClass("col s4 m2 mvImgWrap");
    let image2 = $("<img>").addClass("mvImg").attr("src", data.Poster);
    let titleWrap = $("<div>").addClass("col s8 m10 mvTitle");
    let title = $("<h5>").attr("id", "title").text(data.Title);
    let yearP = $("<p>").addClass("year-released").text(data.Released)
    let formCol = $("<div>").addClass("col col s8 m10");
    let form = $("<form>").attr("action", "#");
    let sliderParagraph = $("<p>").addClass("formP").text("Use slider to rate movie");
    let slider = $("<p>").addClass("range-field").html("<input type='range' id='rating' min='0' max='100' />");
    let row2 = $("<div>").addClass("row");
    let inputField = $("<div>").addClass("input-field col s12");
    let nameField = $("<input>").addClass("validate").attr({
      placeholder: "Name (optional)",
      id: "name",
      type: "text",
    });
    let ageField = $("<input>").addClass("validate").attr({
      placeholder: "Age (required)",
      id: "age",
      type: "text",
      required: true
    });
    let reviewField = $("<textarea>").addClass("materialize-textarea").attr({
      placeholder: "Your Review (optional)",
      id: "review",
      "data-length": "255",
      maxlength: "255"
    })
    let locationButton = $("<button>").addClass("waves-effect waves-light btn locationBtn").attr("id", "locationBtn").html("<i class='material-icons right'>add_location</i>Location");
    let locationDisplay = $("<p>").attr("id", "coord");
    let submitButton = $("<button>").addClass("btn waves-effect waves-light").attr({
      id: "submitBtn",
      type: "submit",
      name: "action",
    }).html("<i class='material-icons right'>send</i>Submit");

    // append the content together
    imgWrap.append(image2);
    title.append(yearP);
    titleWrap.append(title);
    inputField.append(nameField);
    inputField.append(ageField);
    inputField.append(reviewField);
    inputField.append(locationButton);
    inputField.append(locationDisplay);
    inputField.append(submitButton);
    row2.append(inputField)
    form.append(sliderParagraph);
    form.append(slider);
    form.append(row2)
    formCol.append(form);
    row1.append(imgWrap);
    row1.append(titleWrap);
    row1.append(formCol);
    formWrap.append(row1);

    // put the content on the DOM
    $("#search").append(formWrap);
  }
  // alert if data could not be found
  else {
    alert("The movie you searched for could not be found");
  };
};

// ======================================================================================
// GEOLOCATION LOGIC
// ======================================================================================
// function that checks to see if GPS capability is available and then create the map
function getLocation() {
  event.preventDefault();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      // set the values of the location and display them
      myLat = parseFloat(position.coords.latitude);
      myLong = parseFloat(position.coords.longitude);
      $("#coord").html("Latitude: " + myLat + "<br>Longitude: " + myLong);

      // adds a map to the site for use later
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
$(document).ready(function () {
  // carousel control
  $(".sidenav").sidenav();



  // function to get the information from submit button
  $("#search-movie").on("click", function (event) {
    // stop the default behavior
    event.preventDefault();

    // grab the movie-name for the query
    movieName = $("#movie-name").val().trim();

    // run the ajax calls and display function
    searchMovie();
  });

  $("#submit").on("click", function (event) {
    // stop the default behavior
    event.preventDefault();

    // grab the information from the form for Movie review data and store it in variables.
    var newReview = {
      title: $("#title").val(),
      year_released: $("#year-released").val(),
      movie_img_html: $("#movie-img").attr("src"),
      rating: $("#rating").val(),
      review: $("#review").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/movies", {
      type: "POST",
      data: newReview
    }).then(
      function () {
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
      function () {
        console.log("created new user");
        // Reload the page to get the updated list
        location.reload();
      }
    );

  });




  // function to run getloction if loc button is clicked
  $("#locationBtn").on("click", getLocation);

});
// run the function for the carousel
runCarousel();
