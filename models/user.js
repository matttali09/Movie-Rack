module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // Giving the User model a name and gender of type STRING and age of type integer
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 255]
            }
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        }
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
