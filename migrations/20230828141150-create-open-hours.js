'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OpenHours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sunday: {
        type: Sequelize.STRING
      },
      monday: {
        type: Sequelize.STRING
      },
      tuesday: {
        type: Sequelize.STRING
      },
      wednesday: {
        type: Sequelize.STRING
      },
      thursday: {
        type: Sequelize.STRING
      },
      friday: {
        type: Sequelize.STRING
      },
      saturady: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',   // Referencing the 'Users' table
          key: 'email'      // Referencing the 'email' column in the 'Users' table
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OpenHours');
  }
};