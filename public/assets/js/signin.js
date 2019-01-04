// globals
var myLat;
var myLong;

// shorthand for doc.ready
$(function () {
      // Getting references to our submit button inputs
  var loginButton = $("#createU");
  var nameInput = $("#name");
  var ageInput = $("#age");

  // When the input is submitted, we validate there's an name and age entered
  loginButton.on("click", function(event) {
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      age: ageInput.val().trim()
    };

    if (!userData.name || !userData.age) {
      return;
    }

    // If we have an email and age we run the loginUser function and clear the input areas
    loginUser(userData.name, userData.age);
    nameInput.val("");
    ageInput.val("");
    $("#coord").val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the home page
  function loginUser(name, age) {
    $.post("/api/login", {
      name: name,
      age: age
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  };

})