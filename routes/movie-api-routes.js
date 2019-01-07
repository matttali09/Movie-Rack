// Requiring our models
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the movie posts
  app.get("/api/movies", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Add an "include" property to our options in our findAll query
    // Set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Movie.findAll({
      where: query,
      include: [db.User]
    }).then(function (dbMovie) {
      res.json(dbMovie);
    });
  });
<<<<<<< HEAD
  // Get route for retrieving a single post
  app.get("/api/movies/:title", isAuthenticated, function (req, res) {
=======

  // Get route for rerouting a page based of the title.
  app.get("/api/movies/:title", function (req, res) {
>>>>>>> 31a119a2ba35a67784b3e617e572f1062e5101da
    console.log("line 29 req params title: " + req.params.title)
    // Add an "include" property to our options in our findOne query
    // Set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    console.log(req.params.title)
    db.Movie.findAll({
      where: {
        title: req.params.title
      },
      order: [
        ['rating', 'DESC']
      ],
      include: [db.User]
    }).then(function (dbMovie) {
<<<<<<< HEAD
      var movieObj = {
        title: dbMovie.title.replace(/\-/g, " ").toUpperCase(),
        year: dbMovie.year_released,
        imgHref: dbMovie.movie_img_html
      };
      console.log("test variables: " + dbMovie.movie_img_html)
      console.log("this is line 41 dbMovie:" + JSON.stringify(dbMovie))
      if (movieObj) {
      res.render("movie-detail", movieObj);
      }
=======
      console.log("this is line 43 dbMovie:" + JSON.stringify(dbMovie))
      if (dbMovie[0] != null) {
        if (dbMovie.len >= 3) {
        // get the indexes of the medians, rounding to not get decimals in case not divisible by 4
        var upperIndex = Math.round(dbMovie.length / 4);
        var middleIndex = Math.round(dbMovie.length / 2);
        var lowerIndex = Math.round(dbMovie.length * 3 / 4);

        // create a variable for each of the 3 medians we will want to get the ratings from
        var upperMedianIndex = dbMovie[upperIndex];
        var middleMedianIndex = dbMovie[middleIndex];
        var lowerMedianIndex = dbMovie[lowerIndex];

        // get all the information from those index locations needed.
        var upperName = upperMedianIndex.User.name;
        var upperScore = upperMedianIndex.rating;
        var upperReview = upperMedianIndex.review;
        var middleName = middleMedianIndex.User.name;
        var middleScore = middleMedianIndex.rating;
        var middleReview = middleMedianIndex.review;
        var lowerName = lowerMedianIndex.User.name;
        var lowerScore = lowerMedianIndex.rating;
        var lowerReview = lowerMedianIndex.review;

        }

        // get all ratings
        var ratingArray = [];
        for (i in dbMovie) {
          ratingArray.push(dbMovie[i].rating)
        }
        console.log("rating array:" + ratingArray)
        // same for reviews
        var reviewArray = [];
        for (i in dbMovie) {
          reviewArray.push(dbMovie[i].review)
        };

        console.log("review array:" + reviewArray)
        var movieObj = {
          title: dbMovie[0].title.replace(/\-/g, " ").toUpperCase(),
          year: dbMovie[0].year_released,
          imgHref: dbMovie[0].movie_img_html,
          ratings: ratingArray,
          reviews: reviewArray,
          upperMedianName: upperName,
          upperMedianScore: upperScore,
          upperMedianReview: upperReview,
          middleMedianName: middleName,
          middleMedianScore: middleScore,
          middleMedianName: middleReview,
          lowerMedianName: lowerName,
          lowerMedianScore: lowerScore,
          lowerMedianReview: lowerReview,
        };
        res.render("movie-detail", movieObj);
      }
      else {
        res.render("movie-detail-none", dbMovie)
      }
    });
  });

  // GET route for movies based off of the imgHref due to constraints on movie title
  app.get("/api/movies:imgHref", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Add an "include" property to our options in our findAll query
    // Set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Movie.findAll({
      where: query,
      include: [db.User]
    }).then(function (dbMovie) {
      res.json(dbMovie);
>>>>>>> 31a119a2ba35a67784b3e617e572f1062e5101da
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