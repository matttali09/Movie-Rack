// ======================================================================================
// Ajax Logic
// ======================================================================================
// get the movie title from the page
var movieName = $("#title").text();


// ajax functiion for a single movie
getReviews = function () {
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
        displayReviews(resp);
    });
}

//================ movie review ================
function displayReviews(data) {

    // create paragraphs of the ratings with the name and rating    
    for (i in data.Ratings) {
        var ratingParagraphs = $("<p>").addClass("otherRatings").text(data.Ratings[i].Source + " " + data.Ratings[i].Value);
        // append to dom
        $("#otherRatings").append(ratingParagraphs)
    }


}

// ======================================================================================
// Document LOGIC
// ======================================================================================
$(document).ready(function () {
    // sidnav control
    $(".sidenav").sidenav();

    // This grabs the values for the all users hidden paragraphs and stores it into the right spot
    var i = 0;
    while ($(".userNames"+i).html() != undefined) { 
    var userNames = $(".userNames" +i).html();
    $("#userName"+i).text(userNames)
    i++;
    };

    var i = 0;
    while ($(".userRatings"+i).html() != undefined) { 
    var userRating = $(".userRatings" +i).html();
    $("#userName" + i).append("<span id='usrRating'>    "+ userRating + "%</span>")
    i++;
    };


    // set up the display all section button
    function moreReviewsBtn() {
        $("#more-reviews").click(function () {
            $("#hidder").toggle(2000, function () {

                // second button at bottom to hide reviews
                $("#hide-reviews").click(function () {
                    $("#hidder").hide(2000, function () {
                    });
                })
            });
        });
    };
    moreReviewsBtn();

    // run the function to get reviews and then append to DOM
    getReviews();
});