// globals
var myLat;
var myLong;
// create a temporary variable for user current lat and long incase they dont update it.
var curLat;
var curLong;

// shorthand for doc.ready
$(function () {
    // Getting references to our submit button inputs
    var loginButton = $("#submit");
    var updateButton = $("#update")
    var nameInput = $("#name");
    var ageInput = $("#age");

    // When the input is submitted, we validate there's an name and age entered
    loginButton.on("click", function (event) {
        console.log("loggin button pressed");
        
        event.preventDefault();
        var userData = {
            name: nameInput.val().trim(),
            age: ageInput.val().trim()
        };

        if (!userData.age) {
            return;
        };
        if (!userData.name) {
            userData.name = "Anonymous";
        };

        // If we have an email and age we run the loginUser function and clear the input areas
        loginUser(userData.name, userData.age);
        nameInput.val("");
        ageInput.val("");
    });

    // loginUser does a post to our "api/signin" route and if successful, redirects us the the home page
    function loginUser(name, age) {
        $.post("/api/signin", {
            name: name,
            age: age
        }).then(function (data) {
            window.location.replace(data);
            // If there's an error, log the error
        }).catch(function (err) {
            console.log(err);
        });
    };

    // When the input is submitted, we validate there's an name and age entered
    updateButton.on("click", function (event) {
        event.preventDefault();

        // search through users and if name and age are the same
        $.get("/api/users:", req.user.id, function (data) {
            // console.log("user", data);
            curLat = data.userLat;
            curLong = data.userLat;
        });

        // if user has not updated set my lat and long to what they have stored
        if (!myLat) {
            myLat = curLat;
            myLong = curLong;
        }

        var userData = {
            name: nameInput.val().trim(),
            age: ageInput.val().trim(),
        };
        if (!userData.name) {
            userData.name = "Anonymous";
        }

        if (!userData.age) {
            return;
        }

        // If we have an email and age we run the loginUser function and clear the input areas
        updateUser(userData.name, userData.age);
        nameInput.val("");
        ageInput.val("");
        $("#coord").val("");
    });

    // updateUser does a put to our "api/users" route and if successful, redirects us the the home page
    function updateUser(name, age) {
        $.put("/api/users", {
            name: name,
            age: age,
            newLat: myLat,
            newLong: myLong
        }).then(function (data) {
            window.location.replace(data);
            // If there's an error, log the error
        }).catch(function (err) {
            console.log(err);
        });
    };

    // run the getloction function on location button press on a form.
    locationBtnFun = function () {
        $("#locationBtn").on("click", function () {
            console.log("location button pressed: ")

            getLocation();

        });
    };
    // start up listener for non dynamically applied elements.
    locationBtnFun();
});


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
            console.log("Latitude: %f Longitude: %f", myLat, myLong);

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