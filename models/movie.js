module.exports = function (sequelize, DataTypes) {
    var Movie = sequelize.define("Movie", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 255]
            }
        },
        year_released: {
            type: DataTypes.STRING,
            allowNull: true,
            len: [1]
        },
        movie_img_html: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 255]
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 255]
            }
        }
    });

    Movie.associate = function (models) {
        // We're saying that a Movie should belong to an User
        // A Movie can't be stored in the database without User database entry due to the foreign key constraint
        Movie.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Movie;
};