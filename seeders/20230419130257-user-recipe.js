'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("User_recipes", [
      {
        idUser:2,
        idRecipe:1,
        cmt: 'Naisu',
        isLike: 1,
      },
      {
        idUser:3,
        idRecipe:1,
        isLike:0,
        
      }
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
