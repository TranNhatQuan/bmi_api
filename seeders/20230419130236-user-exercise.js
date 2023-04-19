'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("User_exercises", [
      {
        idUser:2,
        idExercise:1,
        cmt: 'Naisu',
        isLike: 1,
      },
      {
        idUser:3,
        idExercise:1,
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
