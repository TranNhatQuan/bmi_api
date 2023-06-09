'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exercises', {
      idExercise: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        type: Sequelize.STRING(45),
        unique: true,
        allowNull: false,
      },
      info: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      calories: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      points:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exercises');
  }
};