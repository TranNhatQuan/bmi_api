'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      idRecipe: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(45),
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
      proteins: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      carbo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Types", key: "idType" },
      },
      points:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipes');
  }
};