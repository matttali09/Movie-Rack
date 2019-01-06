// ======================================================================================
// Globals
// ======================================================================================
// array of top 10 movies and to be displayed when page loads
let topMovies = [
  "Aquaman",
  "Pulp+Fiction",
  "Mary+Poppins+Returns",
  "The+Grinch",
  "How+The+Grinch+Stole+Christmas",
  "Venom",
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



// function to display a single movie
function displayMovie(data) {

  // create a random number to make sure the number applied is dynamic between 1/1000 to make chance of double approx 1%
  let randomNum = Math.round(Math.random() * 1000)

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
    let title = $("<a>").attr("href", "/api/movies/" + data.title).html("<h5 id='title'> " + data.Title + "</h5>");
    let yearP = $("<p>").addClass("year-released").text(data.Released);
    let formCol = $("<div>").addClass("col col s8 m10");
    let form = $("<form>").addClass("ajax");
    let sliderParagraph = $("<p>").addClass("formP").text("Use slider to rate movie");
    let slider = $("<p>").addClass("range-field").html("<input type='range' name='rating' id='rating' min='0' max='100' />");
    let sliderVal = $("<p>").addClass("center slider-txt").attr("id", "slider-txt");
    let row2 = $("<div>").addClass("row");
    let inputField = $("<div>").addClass("input-field col s12");
    let reviewField = $("<textarea>").addClass("materialize-textarea").attr({
      placeholder: "Your Review (required)",
      id: "review",
      name: "review",
      "data-length": "255",
      maxlength: "255"
    })
    let btnDiv = $("<div>").addClass("btn-div " + i);
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
// Document LOGIC
// ======================================================================================
$(document).ready(function () {
  // sidnav control
  $(".sidenav").sidenav();

  // slider listener function to be activated when sliders are created
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
  // get the user select from passport req.user.id

  // submit info function for forms of user's review
  submitReview = function () {
    for (var i = 0; i <= 1000; i++) {
    $("div.btn-div." + i).on("click", "#submitBtn", function (event) {
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
      if (!titleInput || !yearInput || !imgInput || !reviewInput || !userSelect) {
        alert("Please fill out the review section one word will do! :)")
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
      // console.log(newReview)

      // Send the POST request.
      $.post("/api/movies", newReview)
        .then(function (response) {
          alert("Thank you for submitting a review")
          console.log("created new movie rating");
          // console.log(response)
          location.reload();
          return;
        }
        );

    });
    };
    return false;
  };
  submitReview();

  // function for running the grid Ajax function
function runGrid() {
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
      gridAjax(resp);

    });
  };
}




// function for dynamically apply the grid items
function gridAjax(data) {
  // console.log(data.Title)
  // console.log(data.Ratings)

  // create a random number to make sure the number applied is dynamic between 1/1000 to make chance of double approx 1%
  let randomNum = Math.round(Math.random() * 1000)

  // make the grid anchor tag 
  let gridDiv = $("<div>").addClass("col s6 m3");
  let gridAnchor = $("<a>").addClass("").attr("href", "#");

  // make the the image tag and append it to the grid item and the item to the gid div
  let image1 = $("<img>").addClass("modal-trigger mvImg grdImg").attr("src", data.Poster).attr("href", "#modal" + randomNum);
  gridAnchor.append(image1);
  gridDiv.append(gridAnchor)

  // make the modal for each movie
  let modal = $("<div>").addClass("modal").attr("id", "modal" + randomNum);
  let formWrap = $("<div>").addClass("formWrap col s12");
  let row1 = $("<div>").addClass("row");
  let imgWrap = $("<div>").addClass("col s4 m2 mvImgWrap");
  let image2 = $("<img>").addClass("mvImg").attr("src", data.Poster);
  // let rating0 = $("<p>").text(data.Ratings[0].Value);
  // let rating1 = $("<p>").text(data.Ratings[1].Value);
  // let rating2 = $("<p>").text(data.Ratings[2].Value);
  let titleWrap = $("<div>").addClass("col s8 m10 mvTitle");
  let title = $("<a>").attr("href", "/api/movies/" + data.title).html("<h5 id='title'> " + data.Title + "</h5>");
  let yearP = $("<p>").addClass("year-released").text(data.Released);
  let formCol = $("<div>").addClass("col col s8 m10");
  let form = $("<form>").attr("method", "post").addClass("ajax");
  let sliderParagraph = $("<p>").addClass("formP").text("Use slider to rate movie");
  let slider = $("<p>").addClass("range-field").html("<input type='range' name='rating' id='rating' min='0' max='100' />");
  let sliderVal = $("<p>").addClass("center slider-txt").attr("id", "slider-txt");
  let row2 = $("<div>").addClass("row");
  let inputField = $("<div>").addClass("input-field col s12");
  let reviewField = $("<textarea>").addClass("materialize-textarea").attr({
    placeholder: "Your Review (required)",
    id: "review",
    name: "review",
    "data-length": "255",
    maxlength: "255"
  })
  let btnDiv = $("<div>").addClass("btn-div " + randomNum);
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
  $('.imgGridWrapper').append(gridDiv);
  $("#modal-spot").append(modal);

  // reinitialize listeners
  // $(this).trigger("event");
  sliderListener();
  $('.modal').modal();
  $('input#input_text, textarea#review').characterCounter();
  // $("#submitBtn").off();
  submitReview();
};

  // run the function for the grid
  runGrid();

});
