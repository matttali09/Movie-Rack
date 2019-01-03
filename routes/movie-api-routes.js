// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the movie posts
  app.get("/api/movies", function(req, res) {
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
    }).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/movies/:id", function(req, res) {
    // Add an "include" property to our options in our findOne query
    // Set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });

  // POST route for saving a new post
  app.post("/api/movies", function(req, res) {
    
    console.log("this is the req.body: " +req.body);
    db.Movie.create(req.body).then(function(dbMovie) {
      console.log("this is the dbMovie: " +dbMovie);

      res.json(dbMovie);
    });
  });

  // DELETE route for deleting movies
  app.delete("/api/movies/:id", function(req, res) {
    db.Movie.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });

  // PUT route for updating movies
  app.put("/api/movies", function(req, res) {
    db.Movie.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });
};