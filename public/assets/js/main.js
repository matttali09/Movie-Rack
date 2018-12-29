$(document).ready(function() {
  $(".sidenav").sidenav();
  $('.carousel').carousel();
  $('.modal').modal();
  $("#carouselClick").click(function(){
    $("#movieFormAquaman").animate({
      opacity: '0.9',
      height: '296px',
      width: '400px'
    });
  });
});

var newRating = {
  range: $("test5").val().trim()
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