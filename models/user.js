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
    });

    User.associate = function (models) {
        // Associating User with Movies
        // When an User is deleted, also delete any associated Movies
        User.hasMany(models.Movie, {
            onDelete: "cascade"
        });
    };


    return User;
};
