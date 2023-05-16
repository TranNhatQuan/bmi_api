'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("User_exercises", [
      {
        idUser:2,
        idExercise:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:3,
        idExercise:1,
        date: '2023-04-24 12:59:59',
        isLike:0,
        
      },
      {
        idUser:3,
        idExercise:2,
        date: '2023-04-24 12:59:59',
        isLike:1,
        
      },
      {
        idUser:3,
        idExercise:3,
        date: '2023-04-24 12:59:59',
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
