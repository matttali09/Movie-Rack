$(document).ready(function() {
  $(".sidenav").sidenav();
  $('.carousel').carousel();
  $('.collapsible').collapsible();
  $( ".bottom-form" ).click(function() {
    $( ".bottom-form" ).animate({
      left: "+=50",
      width: "300px",
    }, 1000, function() {
      // Animation complete.
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