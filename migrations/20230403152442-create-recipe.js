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
      proteins: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      fats: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      carbo: {
        type: Sequelize.DOUBLE,
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