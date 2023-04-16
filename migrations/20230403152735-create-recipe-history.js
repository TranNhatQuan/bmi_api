'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipe_histories', {
      idRecipe_history: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser: {
        allowNull: false,
        references: { model: "Users", key: "idUser" },
        
        type: Sequelize.INTEGER,
      },
      idRecipe: {
        allowNull: false,
        references: { model: "Recipes", key: "idRecipe" },
       
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        
        type: Sequelize.DATEONLY,
        //YYYY-MM-DD
      },
      filter: {
        allowNull: false,
        type: Sequelize.INTEGER,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipe_histories');
  }
};