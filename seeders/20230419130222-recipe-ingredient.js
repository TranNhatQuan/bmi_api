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
      {
        idRecipe: 5,
        idIngredient: 3,
        quantity: 2,
        unitName: "g"
      },
       {
        idRecipe: 5,
        idIngredient: 6,
        quantity: 2,
        unitName: "g"
      },
       {
        idRecipe: 5,
        idIngredient: 7,
        quantity: 2,
        unitName: "g"
      },
      {
        idRecipe: 6,
        idIngredient: 3,
        quantity: 2,
        unitName: "g"
      },
       {
        idRecipe: 6,
        idIngredient: 7,
        quantity: 2,
        unitName: "g"
      },
       {
        idRecipe: 6,
        idIngredient: 8,
        quantity: 2,
        unitName: "g"
      },
       {
        idRecipe: 6,
        idIngredient: 9,
        quantity: 2,
        unitName: "g"
      },
      {
        idRecipe: 7,
        idIngredient: 10,
        quantity: 2,
        unitName: "g"
      },
      {
        idRecipe: 7,
        idIngredient: 11,
        quantity: 2,
        unitName: "g"
      },
      {
        idRecipe: 7,
        idIngredient: 12,
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
