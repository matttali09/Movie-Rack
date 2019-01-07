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
  // Get route for retrieving a single post
  app.get("/api/movies/:title", isAuthenticated, function (req, res) {
    console.log("line 29 req params title: " + req.params.title)
    // Add an "include" property to our options in our findOne query
    // Set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    console.log(req.params.title)
    db.Movie.findOne({
      where: {
        title: req.params.title
      },
      order: [
        ['rating', 'DESC']
      ],
      include: [db.User]
    }).then(function (dbMovie) {
      console.log("this is line 43 dbMovie:" + JSON.stringify(dbMovie))
      if (dbMovie != null) {
      var movieObj = {
        title: dbMovie.title.replace(/\-/g, " ").toUpperCase(),
        year: dbMovie.year_released,
        imgHref: dbMovie.movie_img_html
      };
      console.log("test variables: " + dbMovie.movie_img_html)
      console.log("this is line 51 dbMovie:" + JSON.stringify(dbMovie))
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