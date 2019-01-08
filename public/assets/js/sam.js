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

    // set up the display all section button
    $("#more-reviews").click(function () {
        $("#hidder").toggle(2000, function () {
        });
    });

    // run the function to get reviews and then append to DOM
    getReviews();
});