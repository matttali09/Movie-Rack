var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/age and name
passport.use(new LocalStrategy(
  // Our user will sign in using an age, rather than a "username"
  {
    userageField: "age"
  },
  function(name, age, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        age: age
      }
    }).then(function(dbUser) {
      // If there's no user with the given age
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect age."
        });
      }
      // If there is a user with the given age, but the name the user gives us is incorrect
      else if (!dbUser.samename(name)) {
        return done(null, false, {
          message: "Incorrect name."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;