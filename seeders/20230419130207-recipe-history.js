'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Recipe_histories", [
      {
        idUser: 2,
        idRecipe: 1,
        date: '2023-04-19',
        filter: 1,
      },
      {
        idUser: 2,
        idRecipe: 2,
        date: '2023-04-19',
        filter: 1,
      },
      {
        idUser: 2,
        idRecipe: 1,
        date: '2023-04-19',
        filter: 2,
      },
      {
        idUser: 2,
        idRecipe: 1,
        date: '2023-04-19',
        filter: 3,
      },
      {
        idUser: 2,
        idRecipe: 2,
        date: '2023-04-19',
        filter: 3,
      },
      {
        idUser: 2,
        idRecipe: 2,
        date: '2023-04-19',
        filter: 2,
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
