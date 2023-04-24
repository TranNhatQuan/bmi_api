'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_recipes', {
      idUser: {
        allowNull: false,
        
        primaryKey: true,
        references: { model: "Users", key: "idUser" },
        type: Sequelize.INTEGER
      },
      idRecipe: {
        allowNull: false,
        
        primaryKey: true,
        references: { model: "Recipes", key: "idRecipe" },
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
    await queryInterface.dropTable('User_recipes');
  }
};