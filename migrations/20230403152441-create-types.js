'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Types', {
      idType: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipes');
  }
};