'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Sets", [
      {
        index:1,
        idExercise:1,
        //1
      },
      {
        index:2,
        idExercise:1,
        //2
      },
      {
        index:3,
        idExercise:1,
        //3
      },
      {
        index:1,
        idExercise:2,
        //4
      },
      {
        index:2,
        idExercise:2,
        //5
      },
      {
        index:3,
        idExercise:2,
        //6
      },
      {
        index:1,
        idExercise:3,
        //7
      },
      {
        index:2,
        idExercise:3,
        //8
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
