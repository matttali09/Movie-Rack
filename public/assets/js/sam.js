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
//================ movie review ================
function displayReview(data) {
    // Movie Poster Image
    let rowOne = $("<div>").addClass("row");
    let imgBox = $("<div>").addClass("col s4 m3 l2");
    let imgMain = $("<img>").addClass("mvImg").attr("src", data.Poster);

    //  For Holding Everything Else Below...
    let infoHolder = $("<div>").addClass("col s8 m9 l10");

    // Title / Date / (Critic Reviews - will need further discussion with team)
    let titleDateCriticBox = $("<div>");
    let movTitle = $("<h5>").attr("id", "title").text(data.Title);
    let movDate = $("<p>").addClass("year-released").text(data.Released);

    /*Top Customer Review (Username / Rating / Comment) - the variable commentHeader can be used again in the Middle and Bottom reviews to be rendered - I only placed it in the Top review section*/
    let userNameTop = $("<p>").attr("id", "userName0").text("???");
    let userRatingTop = $("<span>").attr("id", "usrRating0").text("???");
    let commentHeader = $("<p>").text("comment");
    let userCommentTop = $("<p>").attr("id", "comment0").text("???");
    //Middle Customer Review (Username / Rating / Comment)
    let userNameMiddle = $("<p>").attr("id", "userName1").text("???");
    let userRatingMiddle = $("<span>").attr("id", "usrRating1").text("???");
    let userCommentMiddle = $("<p>").attr("id", "comment1").text("???");
    //Bottom Customer Review (Username / Rating / Comment)
    let userNameBottom = $("<p>").attr("id", "userName2").text("???");
    let userRatingBottom = $("<span>").attr("id", "usrRating2").text("???");
    let userCommentBottom = $("<p>").attr("id", "comment2").text("???");

    for (i in data.Ratings) {
    let rating = $("<p>").text(data.Ratings[i].Source + " " + data.Ratings[i].Value);
    }
    

    //Map for creating the results dynamically:

    //first, create and position the image
    imgBox.append(imgMain);
    rowOne.append(imgBox);
    //Next, create the Title, year and rating section, which will attach to a larger container called infoHolder
    movTitle.append(movDate);
    titleDateCriticBox.append(movTitle);
    titleDateCriticBox.append(rating);
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

    // Function for retrieving review and getting them ready to be rendered to the page
    function getTopReview() {
        $.get("/api/movies/:title", function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createAuthorRow(data[i]));
            }
            renderAuthorList(rowsToAdd);
            nameInput.val("");
        });
    }

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
    }
}
