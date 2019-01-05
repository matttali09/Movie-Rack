// globals
var myLat;
var myLong;

$(document).ready(function () {
    // Getting references to our form and input
    var signUpForm = $("#createU");
    var nameInput = $("#name");
    var ageInput = $("#age");

    // When the signup button is clicked, we validate the name and age are not blank
    signUpForm.on("click", function (event) {
        console.log("create user button pressed")
        event.preventDefault();
        var userData = {
            name: nameInput.val().trim(),
            age: ageInput.val().trim()
        };
        if (!userData.name) {
            userData.name = "Anonymous";
        };

        if (!userData.age) {
            return;
        };

        // If we have an name and age, run the signUpUser function
        signUpUser(userData.name, userData.age);
        nameInput.val("");
        ageInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(name, age) {
        $.post("/api/signup", {
            name: name,
            age: age,
            userLat: myLat,
            userLong: myLong
        }).then(function (data) {
            console.log("this ran1")
            window.location.replace(data);
            // If there's an error, handle it by throwing up a bootstrap alert
        }).catch(function (err) {
            console.log(err);
        });
    }

    // function handleLoginErr(err) {
    //     $("#alert .msg").text(err.responseJSON);
    //     $("#alert").fadeIn(500);
    // }

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

