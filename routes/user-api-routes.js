var db = require("../models");

module.exports = function (app) {
  // Get route to get data from all users
  app.get("/api/users", function (req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.User.findAll({
      include: [db.Movie]
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Get route to get data  from a specific user
  app.get("/api/users/:id", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Movie]
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // PUT route for updating users
  app.put("/api/users", function (req, res) {
    console.log("this ran2")
    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbUser) {
        res.json(dbUser);
      });
  });

  // Post route for creating users
  app.post("/api/users", function (req, res) {
    db.User.create(req.body).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Delete route for deleting users
  app.delete("/api/users/:id", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

};
