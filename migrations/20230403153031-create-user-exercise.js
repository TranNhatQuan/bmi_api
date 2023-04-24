'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_exercises', {
      idUser: {
        allowNull: false,
        
        primaryKey: true,
        references: { model: "Users", key: "idUser" },
        type: Sequelize.INTEGER
      },
      idExercise: {
        allowNull: false,
        
        primaryKey: true,
        references: { model: "Exercises", key: "idExercise" },
        type: Sequelize.INTEGER
      },
      cmt:{
        allowNull: true,
        type: Sequelize.TEXT,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      isLike: {
        allowNull: false,
        type: Sequelize.INTEGER,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_exercises');
  }
};