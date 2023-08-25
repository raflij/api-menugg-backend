const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize'); // Replace with your sequelize instance

const ActivityModel = sequelize.define('Activity', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activityType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activityMessage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = ActivityModel;
