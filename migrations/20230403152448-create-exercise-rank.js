'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exercise_ranks', {
      rank:{
        type:Sequelize.INTEGER,
        primaryKey:true,
      },
      idExercise: {    
        allowNull:false,
        type: Sequelize.INTEGER,
        references: { model: "Exercises", key: "idExercise" },
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,

      },
      calories: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      points:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exercise_ranks');
  }
};