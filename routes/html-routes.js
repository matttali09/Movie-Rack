// Dependencies
// =============================================================
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Movie.findAll({
      include: [{
        model: dbUser,
        where: {
          user_id: id
        },
        required: false
      }]
    }).then(function (dbMovie) {
      // We have access to the todos as an argument inside of the callback function
      res.render("index", dbMovie);
    });
  });

  // cms route loads cms.html
  app.get("/favorites", function (req, res) {
    db.Movie.findAll({
      include: [{
        model: dbUser,
        where: {
          user_id: id
        },
        required: false
      }]
    }).then(function (dbMovie) {
      // We have access to the todos as an argument inside of the callback function
      res.render("favorites", dbMovie);
    });
  });

};