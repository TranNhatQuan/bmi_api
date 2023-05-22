'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Recipe_ingredients", [
      {
        idRecipe: 1,
        idIngredient: 1,
        quantity: 2,
        unitName: "g"
      },
      {
        idRecipe: 1,
        idIngredient: 2,
        quantity: 2,
        unitName: "ml"
      },
      {
        idRecipe: 2,
        idIngredient: 1,
        quantity: 2,
        unitName: "g"
      },
      {
        idRecipe: 3,
        idIngredient: 1,
        quantity: 2,
        unitName: "g"
      },
      {
        idRecipe: 4,
        idIngredient: 4,
        quantity: 2,
        unitName: "g"
      },
       {
        idRecipe: 4,
        idIngredient: 5,
        quantity: 2,
        unitName: "g"
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
