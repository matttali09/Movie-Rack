// Requiring our models
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function (app) {

  // Get route for rerouting a page based of the title.
  app.get("/api/movies/:title", function (req, res) {
    // Add an "include" property to our options in our findAll query
    // Set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Movie.findAll({
      where: {
        title: req.params.title
      },
      order: [
        ['rating', 'DESC']
      ],
      include: [db.User]
    }).then(function (dbMovie) {
      // function to get the average based off the dbMovie.length
      average = function () {
        // prototype for array sum function used in average (found on stack overflow for arrays)
        Object.prototype.sum = function (prop) {
          var total = 0
          for (var i = 0, _len = this.length; i < _len; i++) {
            total += this[i][prop]
          }
          return total
        }
        // use the prototype funtion to get the total and then devide by the len to get the average
        var avg = dbMovie.sum('rating') / dbMovie.length;
        return avg;
      };

      // only pull up the ratings if there are ratings in the database
      if (dbMovie[0] != null) {
        // make if else statements for if the database has more than 3, 2, or 1 rating in the database 
        if (dbMovie.length >= 3) {
          // get the indexes of the medians, rounding to not get decimals in case not divisible by 4
          var upperIndex = Math.round(dbMovie.length / 4);
          var middleIndex = Math.round(dbMovie.length / 2);
          var lowerIndex = Math.round(dbMovie.length * 3 / 4);

          // create a variable for each of the 3 medians we will want to get the ratings from
          var upperMedianIndex = dbMovie[upperIndex];
          var middleMedianIndex = dbMovie[middleIndex];
          var lowerMedianIndex = dbMovie[lowerIndex];

          // get all the information from those index locations needed. (custom replace function to turn first letter into capital)
          var upperName = upperMedianIndex.User.name.replace(/\-/g, " ").replace( /\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
          var upperScore = upperMedianIndex.rating;
          var upperReview = upperMedianIndex.review;
          var middleName = middleMedianIndex.User.name.replace(/\-/g, " ").replace( /\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
          var middleScore = middleMedianIndex.rating;
          var middleReview = middleMedianIndex.review;
          var lowerName = lowerMedianIndex.User.name.replace(/\-/g, " ").replace( /\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
          var lowerScore = lowerMedianIndex.rating;
          var lowerReview = lowerMedianIndex.review;

          // create an array of usernames for all reviews button
          var nameArray = [];
          for (var i = 0; i < dbMovie.length; i++) {
            nameArray.push(dbMovie[i].User.name.replace(/\-/g, " ").replace( /\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}))
          };

          // get all ratings
          var ratingArray = [];
          for (var i = 0; i < dbMovie.length; i++) {
            ratingArray.push(dbMovie[i].rating);
          };
          // console.log("rating array:" + ratingArray);

          // same for reviews
          var reviewArray = [];
          for (var i = 0; i < dbMovie.length; i++) {
            reviewArray.push(dbMovie[i].review);
          };
          // console.log("review array:" + reviewArray);

          // add the average to the movie object with the movie rack tag in front
          var movieRackAver = "MovieRack " + average();

          // create the object to pass to handlebars
          var movieObj = {
            title: dbMovie[0].title.replace(/\-/g, " ").toUpperCase(),
            year: dbMovie[0].year_released,
            imgHref: dbMovie[0].movie_img_html,
            ratings: ratingArray,
            reviews: reviewArray,
            allUsers: nameArray,
            upperMedianName: upperName,
            upperMedianScore: upperScore,
            upperMedianReview: upperReview,
            middleMedianName: middleName,
            middleMedianScore: middleScore,
            middleMedianReview: middleReview,
            lowerMedianName: lowerName,
            lowerMedianScore: lowerScore,
            lowerMedianReview: lowerReview,
            average: movieRackAver,
          };
        }

        // if only two reviews only display the upper and middle index converted for the math round
        else if (dbMovie.length === 2) {
          // get the indexes of the medians, rounding to not get decimals in case not divisible by 4
          var upperIndex = Math.round(dbMovie.length / 4);
          var middleIndex = dbMovie.length;

          // create a variable for each of the 3 medians we will want to get the ratings from
          var upperMedianIndex = dbMovie[upperIndex];
          var middleMedianIndex = dbMovie[middleIndex];

          // get all the information from those index locations needed.
          var upperName = upperMedianIndex.User.name.replace(/\-/g, " ").replace( /\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});;
          var upperScore = upperMedianIndex.rating;
          var upperReview = upperMedianIndex.review;
          var middleName = middleMedianIndex.User.name.replace(/\-/g, " ").replace( /\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});;
          var middleScore = middleMedianIndex.rating;
          var middleReview = middleMedianIndex.review;

          // create an array of usernames for all reviews button
          var nameArray = [];
          for (var i = 0; i < dbMovie.length; i++) {
            nameArray.push(dbMovie[i].User.name.replace(/\-/g, " ").replace( /\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}));
          };

          // get all ratings
          var ratingArray = [];
          for (var i = 0; i < dbMovie.length; i++) {
            ratingArray.push(dbMovie[i].rating);
          };
          // console.log("rating array:" + ratingArray);

          // same for reviews
          var reviewArray = [];
          for (var i = 0; i < dbMovie.length; i++) {
            reviewArray.push(dbMovie[i].review);
          };
          // console.log("review array:" + reviewArray);

          // add the average to the movie object with the movie rack tag in front
          var movieRackAver = "MovieRack " + average();

          // create the object to pass to handlebars
          var movieObj = {
            title: dbMovie[0].title.replace(/\-/g, " ").toUpperCase(),
            year: dbMovie[0].year_released,
            imgHref: dbMovie[0].movie_img_html,
            ratings: ratingArray,
            reviews: reviewArray,
            allUsers: nameArray,
            middleMedianName: middleName,
            middleMedianScore: middleScore,
            middleMedianReview: middleReview,
            average: movieRackAver,
          };
        }

        // if ony one user only display the middle index using the value of 1 from length
        else if (dbMovie.length === 1) {
          // get the indexes of the medians, rounding to not get decimals in case not divisible by 2
          var middleIndex = dbMovie.length;

          // create a variable for each of the 3 medians we will want to get the ratings from
          var middleMedianIndex = dbMovie[upperIndex];

          // get all the information from those index locations needed.
          var middleName = middleMedianIndex.User.name.replace(/\-/g, " ").replace( /\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
          var middleScore = middleMedianIndex.rating;
          var middleReview = middleMedianIndex.review;

          // create an array of usernames for all reviews button
          var nameArray = [];
          for (var i = 0; i < dbMovie.length; i++) {
            nameArray.push(dbMovie[i].User.name.replace(/\-/g, " ").replace( /\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}))
          };

          // get all ratings
          var ratingArray = [];
          for (var i = 0; i < dbMovie.length; i++) {
            ratingArray.push(dbMovie[i].rating);
          };
          // console.log("rating array:" + ratingArray);

          // same for reviews
          var reviewArray = [];
          for (var i = 0; i < dbMovie.length; i++) {
            reviewArray.push(dbMovie[i].review);
          };
          // console.log("review array:" + reviewArray);

          // add the average to the movie object with the movie rack tag in front
          var movieRackAver = "MovieRack " + average();

          // create the object to pass to handlebars
          var movieObj = {
            title: dbMovie[0].title.replace(/\-/g, " ").toUpperCase(),
            year: dbMovie[0].year_released,
            imgHref: dbMovie[0].movie_img_html,
            ratings: ratingArray,
            reviews: reviewArray,
            allUsers: nameArray,
            upperMedianName: upperName,
            upperMedianScore: upperScore,
            upperMedianReview: upperReview,
            average: movieRackAver,
          };
        };
        res.render("movie-detail", movieObj);
      }
      else {
        res.render("movie-detail-none", dbMovie)
      }
    });
  });

  // POST route for saving a new post
  app.post("/api/movies", function (req, res) {

    console.log("this is the req.body: " + req.body);
    db.Movie.create(req.body).then(function (dbMovie) {
      console.log("this is the dbMovie: " + dbMovie);

      res.json(dbMovie);
    });
  });

  // DELETE route for deleting movies
  app.delete("/api/movies/:id", function (req, res) {
    db.Movie.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbMovie) {
      res.json(dbMovie);
    });
  });

  // PUT route for updating movies
  app.put("/api/movies", function (req, res) {
    db.Movie.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbMovie) {
        res.json(dbMovie);
      });
  });
};