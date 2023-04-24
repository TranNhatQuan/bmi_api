'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sets', {
      idSet: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      index: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idExercise: {
        allowNull: false,  
        references: { model: "Exercises", key: "idExercise" },
        type: Sequelize.INTEGER
      }
    });
    await queryInterface.addConstraint('Sets', {
      fields: ['idExercise', 'index'],
      type: 'unique',
      name: 'unique_idExercise_index'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sets');
  }
};