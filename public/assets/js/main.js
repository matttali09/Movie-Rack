// ======================================================================================
// Globals
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

// initialize lat and long vars for geolocate
var myLat;
var myLong;

// ======================================================================================
// Ajax Logic
// ======================================================================================
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
    // console.log(`ombd results:`);
    // console.log(ombdQueryURL);
    // console.log(resp);

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
      // console.log(`ombd results:`);
      // console.log(ombdQueryURL);
      // console.log(resp);

      // add the results to the HTML page
      carouselAjax(resp);

    });
  };
}




// function for dynamically apply the carousel items
function carouselAjax(data) {
  // console.log(data.Title)
  // console.log(data.Ratings)

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
  // let rating0 = $("<p>").text(data.Ratings[0].Value);
  // let rating1 = $("<p>").text(data.Ratings[1].Value);
  // let rating2 = $("<p>").text(data.Ratings[2].Value);
  let titleWrap = $("<div>").addClass("col s8 m10 mvTitle");
  let title = $("<h5>").attr("id", "title").text(data.Title);
  let yearP = $("<p>").addClass("year-released").text(data.Released)
  let formCol = $("<div>").addClass("col col s8 m10");
  let form = $("<form>").attr("method", "post").addClass("ajax");
  let sliderParagraph = $("<p>").addClass("formP").text("Use slider to rate movie");
  let slider = $("<p>").addClass("range-field").html("<input type='range' name='rating' id='rating' min='0' max='100' />");
  let sliderVal = $("<p>").addClass("center slider-txt").attr("id", "slider-txt");
  let row2 = $("<div>").addClass("row");
  let inputField = $("<div>").addClass("input-field col s12");
  let reviewField = $("<textarea>").addClass("materialize-textarea").attr({
    placeholder: "Your Review (optional)",
    id: "review",
    name: "review",
    "data-length": "255",
    maxlength: "255"
  })
  let btnDiv = $("<div>").addClass("btn-div");
  let submitButton = $("<button>").addClass("btn waves-effect waves-light").attr({
    id: "submitBtn",
    type: "submit",
    value: "send",
  }).html("<i class='material-icons right'>send</i>Submit");
  let modalFooter = $("<div>").addClass("modal-footer").html("<a href='#!' class='modal-close waves-effect waves-green btn-flat'>Close</a>");

  // append all data to the rows in correct order for the modal
  imgWrap.append(image2);
  // imgWrap.append(rating0);
  // imgWrap.append(rating1);
  // imgWrap.append(rating2);
  // title.append(yearP);
  btnDiv.append(submitButton);
  titleWrap.append(title);
  titleWrap.append(yearP)
  inputField.append(reviewField);
  row2.append(inputField);
  form.append(sliderParagraph);
  form.append(slider);
  form.append(sliderVal);
  form.append(row2);
  // form.append(btnDiv);
  formCol.append(form);
  formCol.append(btnDiv)
  row1.append(imgWrap);
  row1.append(titleWrap);
  row1.append(formCol);
  formWrap.append(row1);
  modal.append(formWrap);
  modal.append(modalFooter);

  // put the content on the DOM
  $('.carousel').append(carouselDiv);
  // $('.carousel').carousel();
  // $('.carousel').carousel('destroy');
  $('.carousel').carousel();
  $("#carousel-container").append(modal);

  // reinitialize listeners
  // $(this).trigger("event");
  sliderListener();
  // $('.modal').modal();
  // $('.modal').modal('destroy');
  // $('.modal').modal();
  $('input#input_text, textarea#review').characterCounter();
  // $("#submitBtn").off();
  submitReview();
};

// function to display a single movie
function displayMovie(data) {

  // verify the user inputed a movie title that could be found
  if (data.Response !== "False") {
    // make the form div
    let formWrap = $("<div>").addClass("formWrap col s12");
    let row1 = $("<div>").addClass("row");
    let imgWrap = $("<div>").addClass("col s4 m2 mvImgWrap");
    let image2 = $("<img>").addClass("mvImg").attr("src", data.Poster);
    // let rating0 = $("<p>").text(data.Ratings[0].Value);
    // let rating1 = $("<p>").text(data.Ratings[1].Value);
    // let rating2 = $("<p>").text(data.Ratings[2].Value);
    let titleWrap = $("<div>").addClass("col s8 m10 mvTitle");
    let title = $("<h5>").attr("id", "title").text(data.Title);
    let yearP = $("<p>").addClass("year-released").text(data.Released)
    let formCol = $("<div>").addClass("col col s8 m10");
    let form = $("<form>").addClass("ajax");
    let sliderParagraph = $("<p>").addClass("formP").text("Use slider to rate movie");
    let slider = $("<p>").addClass("range-field").html("<input type='range' name='rating' id='rating' min='0' max='100' />");
    let sliderVal = $("<p>").addClass("center slider-txt").attr("id", "slider-txt");
    let row2 = $("<div>").addClass("row");
    let inputField = $("<div>").addClass("input-field col s12");
    let reviewField = $("<textarea>").addClass("materialize-textarea").attr({
      placeholder: "Your Review (optional)",
      id: "review",
      name: "review",
      "data-length": "255",
      maxlength: "255"
    })
    let btnDiv = $("<div>").addClass("btn-div");
    let submitButton = $("<button>").addClass("btn waves-effect waves-light").attr({
      id: "submitBtn",
      type: "submit",
      value: "send",
    }).html("<i class='material-icons right'>send</i>Submit");

    // append the content together
    imgWrap.append(image2);
    // imgWrap.append(rating0);
    // imgWrap.append(rating1);
    // imgWrap.append(rating2);
    // title.append(yearP);
    btnDiv.append(submitButton);
    titleWrap.append(title);
    titleWrap.append(yearP)
    inputField.append(reviewField);
    row2.append(inputField);
    form.append(sliderParagraph);
    form.append(slider);
    form.append(sliderVal);
    form.append(row2);
    // form.append(btnDiv);
    formCol.append(form);
    formCol.append(btnDiv)
    row1.append(imgWrap);
    row1.append(titleWrap);
    row1.append(formCol);
    formWrap.append(row1);

    // put the content on the DOM
    $("#search").append(formWrap);

    // reset page listeners
    sliderListener();
    $('input#input_text, textarea#review').characterCounter();
    // $("#submitBtn").off();
    submitReview();
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
  // console.log("getLocation start:")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      // set the values of the location and display them
      myLat = parseFloat(position.coords.latitude);
      myLong = parseFloat(position.coords.longitude);
      console.log("Latitude: " + myLat + " Longitude: " + myLong);

      // update text
      $("#coord").html("Latitude: " + myLat + "<br>Longitude: " + myLong);

      // adds a map to the site for use later
      // mapboxgl.accessToken = 'pk.eyJ1Ijoid2lucGlsZGV1IiwiYSI6ImNqcDJzbnd1aDAwam8zd3BlejczaWwxa2EifQ.bLD5Bdgv8hiiXbaAIqjLdA';
      // map = new mapboxgl.Map({
      //   container: 'map',
      //   style: 'mapbox://styles/mapbox/streets-v10',
      //   zoom: 13,
      //   center: [myLong, myLat]
      // });
      // map.addControl(new mapboxgl.NavigationControl());
    });
  } else {
    $("#coord").text("Geolocation is not supported by this browser.");
  }
}

// ======================================================================================
// Document LOGIC
// ======================================================================================
$(document).ready(function () {
  // sidnav control
  $(".sidenav").sidenav();
  // $(".modal").modal();
  //   $(this).on("event", function() {
  //      $(".modal").modal();
  //   });
  sliderListener = function () {
    $("form.ajax input[type='range']").change(function () {
      // validate data incoming
      // console.log($(this).val());
      // console.log($("form.ajax input[name='name']").val().trim());
      var str = "";
      str = $(this).val().toString();
      $("input[type='range'] option:selected").each(function () {
        str += $(this).val() + " ";
        // console.log(str);

      });
      $("form.ajax p[id=slider-txt]").text(str);
    }).change();
  };


  // function to get the information from search movie button
  $("#search-movie").on("click", function (event) {
    // stop the default behavior
    event.preventDefault();

    // grab the movie-name for the query
    movieName = $("#movie-name").val().trim();

    // run the ajax calls and display function
    searchMovie();
  });

  var userSelect;
  // submit info function for forms of user's review
  submitUser = function () {
    $("#createU").on("click", function (event) {
      // stop the default behavior
      event.preventDefault();

      // check to make sure the button is working
      console.log("submit button pressed");

      // store variables must be applied after element
      var nameInput = $("#name").val().trim();
      var ageInput = $("#age").val();
      parseInt(ageInput);
      // var latInput = myLat;
      // var longInput = myLong;

      // confirm data being stored
      // console.log(nameInput);
      // console.log(ageInput);
      // console.log(latInput);
      // console.log(longInput);

      // create anonymous tags
      if (!nameInput) {
        nameInput = "Anonymous"
      }

      // Wont submit the post if we are missing an age
      if (!ageInput) {
        alert("age is required please enter the information for security purposes.")
        return;
      }

      // grab the information for user and store it in variables.
      var newUser = {
        name: nameInput,
        age: ageInput,
        userLat: myLat,
        userLong: myLong
      };
      // console.log(newUser)

      // search through users and if name and age are the same
      $.get("/api/users", function (data) {
        console.log("users", data);
        if (data[0]) {
          for (i in data) {
            if (nameInput == data[i].name && ageInput == data[i].age) {
              userSelect = data[i].id;
              console.log(userSelect)
              alert("Thank you for signing in :)");
              $(".user").hide();
              return;
            }
            // else create a new user
            else {
              // Send the POST request to create a new user.
              $.post("/api/users", newUser)
                .then(function (response) {
                  alert("Thank you for signing in!")
                  console.log("created new user1");
                  // Reload the page to get the updated list

                  console.log(response);
                  // save userid to be used for movie review submissions
                  userSelect = response.id;
                  console.log(userSelect)
                  $(".user").hide();

                });
              return;
            };
          }
        }
        // if no data yet
        else {
          // Send the POST request to create a new user.
          $.post("/api/users", newUser)
            .then(function (response) {
              alert("Thank you for signing in!")
              console.log("created new user");
              // Reload the page to get the updated list

              console.log(response);
              // save userid to be used for movie review submissions
              userSelect = response.id;
              console.log(userSelect)
              $(".user").hide();
              return;
            });
        };


      });

    });
    return false;
  };
  submitUser();

  // submit info function for forms of user's review
  submitReview = function () {
    $("div.btn-div").on("click", "#submitBtn", function (event) {
      // stop the default behavior
      event.preventDefault();
      // console.log( $(this).parents() );
      // console.log($(".mvImg").attr("src"));

      // check to make sure the button is working
      // console.log("review processing");

      // store variables must be applied after element
      var titleInput = $(this).parents("div.col.s8.m10").siblings("div.mvTitle").children("h5").text();
      var yearInput = $(this).parents("div.col.s8.m10").siblings("div.mvTitle").children("p").html();
      var imgInput = $(this).parents("div.col.s8.m10").siblings("div.mvImgWrap").children("img").attr("src");
      var ratingInput = $(this).parent().siblings("form.ajax").children("p").find("input[type='range']").val();
      var reviewInput = $(this).parent().siblings("form.ajax").children("div").find("textarea[name='review']").val()

      // confirm data being stored
      // console.log(titleInput);
      // console.log(yearInput);
      // console.log(imgInput);
      // console.log(ratingInput);
      // console.log(reviewInput);

      // Wont submit the post if we are missing a body, title, or user
      if (!titleInput || !yearInput || !imgInput || !userSelect) {
        alert("Please use our signin feature above for database purposes :)")
        return;
      }
      // grab the information from the form for Movie review data and store it in variables.
      var newReview = {
        title: titleInput,
        year_released: yearInput,
        movie_img_html: imgInput,
        rating: ratingInput,
        review: reviewInput,
        UserId: userSelect
      };
      console.log(newReview)

      // Send the POST request.
      $.post("/api/movies", newReview)
        .then(function (response) {
          alert("Thank you for submitting a review")
          console.log("created new movie rating");
          console.log(response)
          location.reload();
          return;
        }
        );

    });
    return false;
  };
  // submitReview();


  // run the getloction function on location button press on a form.
  locationBtnFun = function () {
    $("#locationBtn").on("click", function () {
      console.log("location button pressed: ")

      getLocation();

    });
  };
  // start up listener for non dynamically applied elements.
  locationBtnFun();

  // run the function for the carousel
  runCarousel();

  resetCar = function () {
    $('.carousel').carousel();
    $('.carousel').carousel();
  };
  $("#reset-car").on("click", resetCar)
});
// $(".carousel").carousel('destroy');
// $(".carousel").carousel();
// $(".modal").modal('destroy');
// $(".modal").modal();


$(document).on("trigger", function () {

});