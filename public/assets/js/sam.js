// ======================================================================================
// Ajax Logic
// ======================================================================================

// req params function to get movie name
getMovieInfo = function () {
    $.get("/api/movies/:title", function (data) {
        // get the movies information that will be needed to display on the poster
        //  data.title
        const movieTitle = data.title;
        //  data.movie_img_html
        const moviePoster = data.movie_img_html;
        //  data.year_released
        const movieDate = data.year_released;
        //SAM - Do I add in the function of getMedianRatings here??

    });
};

// get ratings from movies from the get all movies route then manipulate those
// ratings to get the median scores we want for the initial image
getMedianRatings = function () {
    $.get("/api/movies", function (data) {
        // write code to sort by descending rating;
        // create a variable for each of the 3 medians we will want to get the reviews from
        var upperMedian;
        var middleMedian;
        var lowerMedian;

        // get the indexes of the medians, rounding to not get decimals in case not divisible by 4
        var upperIndex = Math.round(data.length / 4);
        var middleIndex = Math.round(data.length / 2);
        var lowerIndex = Math.round(data.length * 3 / 4);

        // get the movies rating information from the median index's

    });
};
// ajax function to get user data 
// after getting the data make an ajax call to get the 

// have to get the users with median scores and then maybe create the elements here to add later
// Function for retrieving review and getting them ready to be rendered to the page
/*function getTopReview() {
    $.get("/api/users/:id", function (data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createAuthorRow(data[i]));
        }
        renderAuthorList(rowsToAdd);
        nameInput.val("");
    });
};*/

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
        displayMovie(resp);
    });
}
//================ movie review ================
function displayReview(data) {
    // Movie Poster Image
    let rowOne = $("<div>").addClass("row");
    let imgBox = $("<div>").addClass("col s4 m3 l2");
    let imgMain = $("<img>").addClass("mvImg").attr("src", MoviePoster);

    //  For Holding Everything Else Below...
    let infoHolder = $("<div>").addClass("col s8 m9 l10");

    // Title / Date / (Critic Reviews - will need further discussion with team)
    let titleDateCriticBox = $("<div>");
    let titleRow = $("<div>").addClass("col s12")
    let movTitle = $("<h5>").attr("id", "title").text(MovieTitle);
    let movDate = $("<p>").addClass("year-released").text(movieDate);

    /*Top Customer Review (Username / Rating / Comment) - the variable commentHeader can be used again in the Middle and Bottom reviews to be rendered - I only placed it in the Top review section*/
    let userNameTop = $("<p>").attr("id", "userName0").text("???");
    let userRatingTop = $("<span>").attr("id", "usrRating0").text("???");
    let commentHeader = $("<p>").text("Comment");
    let userCommentTop = $("<p>").attr("id", "comment0").text("???");
    //Middle Customer Review (Username / Rating / Comment)
    let userNameMiddle = $("<p>").attr("id", "userName1").text("???");
    let userRatingMiddle = $("<span>").attr("id", "usrRating1").text("???");
    let userCommentMiddle = $("<p>").attr("id", "comment1").text("???");
    //Bottom Customer Review (Username / Rating / Comment)
    let userNameBottom = $("<p>").attr("id", "userName2").text("???");
    let userRatingBottom = $("<span>").attr("id", "usrRating2").text("???");
    let userCommentBottom = $("<p>").attr("id", "comment2").text("???");

    // var ratingParagraphs = $("<div>");
    // for (i in data.Ratings) {
    // ratingParagraphs.append($("<p>").addClass("otherRatings").text(data.Ratings[i].Source + " " + data.Ratings[i].Value));
    // }


    //Map for creating the results dynamically:

    //first, create and position the image
    imgBox.append(imgMain);
    rowOne.append(imgBox);
    //Next, create the Title, year and rating section, which will attach to a larger container called infoHolder
    titleRow.append(movTitle);
    titleRow.append(movDate);
    titleDateCriticBox.append(titleRow);
    titleDateCriticBox.append(ratingParagraphs);
    infoHolder.append(titleDateCriticBox);
    //Next, fill in the username, rating and comments, in order of rank/avg, again attaching to infoHolder
    userNameTop.append(userRatingTop);
    infoHolder.append(userNameTop);
    infoHolder.append(commentHeader);
    infoHolder.append(userCommentTop);
    userNameMiddle.append(userRatingMiddle);
    infoHolder.append(userNameMiddle);
    infoHolder.append(commentHeader);
    infoHolder.append(userCommentMiddle);
    userNameBottom.append(userRatingBottom);
    infoHolder.append(userNameBottom);
    infoHolder.append(commentHeader);
    infoHolder.append(userCommentBottom);
    //Lastly, attach infoHolder into rowOne, right below the imgBox
    rowOne.append(infoHolder);

    //Place content in the correct location on the DOM
    $("#review").append(rowOne);



    // A function for rendering the list of authors to the page
    function renderAuthorList(rows) {
        authorList.children().not(":last").remove();
        authorContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            authorList.prepend(rows);
        }
        else {
            renderEmpty();
        }
    };
}

// ======================================================================================
// Document LOGIC
// ======================================================================================
$(document).ready(function () {
    // sidnav control
    $(".sidenav").sidenav();

    // run the function for the the initial data to be displayed
    searchMovie();
});