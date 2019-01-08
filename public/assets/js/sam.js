// ======================================================================================
// Ajax Logic
// ======================================================================================

var movieName = $("#title");

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
        displayReviews(resp);
    });
}

//================ movie review ================
function displayReviews(data) {
    // display the ratings for the response data
    
    // for (i in data.Ratings) {
    // ratingParagraphs.append($("<p>").addClass("otherRatings").text(data.Ratings[i].Source + " " + data.Ratings[i].Value));
    // }
}

// ======================================================================================
// Document LOGIC
// ======================================================================================
$(document).ready(function () {
    // sidnav control
    $(".sidenav").sidenav();
    $("#more-reviews").click(function(){
        $("#hidder").toggle(0250, function(){
          console.log("The toggle() method is finished!");
        });
      });

    $(document).ready(function () {
        // sidnav control
        $(".sidenav").sidenav();
        $("#more-reviews").click(function(){
            $("#hidder").toggle(0250, function(){
              console.log("The toggle() method is finished!");
            });
          });
     
        // run the function for the the initial data to be displayed
        searchMovie();
     });
});