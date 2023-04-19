'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("User_histories", [
      {
        idUser:2,
        date:'2023-04-19',
        weight: 48,
        height: 169,
        calories_in: 0,
        calories_out:0,
        water: 0,
      },
      {
        idUser:2,
        date:'2023-04-20',
        weight: 48,
        height: 169,
        calories_in: 0,
        calories_out:0,
        water: 0,
      },
      {
        idUser:3,
        date:'2023-04-19',
        weight: 200,
        height: 180,
        calories_in: 4000,
        calories_out:0,
        water: 0,
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
