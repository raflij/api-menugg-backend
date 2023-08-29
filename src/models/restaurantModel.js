const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize'); // Replace with your sequelize instance

const RestaurantModel = sequelize.define('Restaurant', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    restaurantName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    googleMapLink: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = RestaurantModel;