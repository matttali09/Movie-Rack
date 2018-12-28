module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // Giving the User model a name and gender of type STRING and age of type integer
        name: DataTypes.STRING,
        age: DataTypes.INTEGER,
        gender: DataTypes.STRING
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
