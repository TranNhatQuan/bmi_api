'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipe_ranks', {
      rank:{
        type:Sequelize.INTEGER,
        primaryKey:true,
      },
      idRecipe: {    
        allowNull:false,
        type: Sequelize.INTEGER,
        references: { model: "Recipes", key: "idRecipe" },
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipe_ranks');
  }
};