var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // Giving the User model a name and gender of type STRING and age of type integer
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 255]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userLat: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        userLong: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
              isEmail: true
            }
          },
    });

    User.associate = function (models) {
        // Associating User with Movies
        // When an User is deleted, also delete any associated Movies
        User.hasMany(models.Movie, {
            onDelete: "cascade"
        });
    };

    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.hook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });


    return User;
};
