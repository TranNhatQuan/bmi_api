'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Menu_equipments", [
      {
        idMenu:1,
        idEquipment:1
      },
      {
        idMenu:1,
        idEquipment:2
      },
      {
        idMenu:2,
        idEquipment:1
      },
      {
        idMenu:3,
        idEquipment:1
      },
      {
        idMenu:4,
        idEquipment:1
      },
       {
        idMenu:5,
        idEquipment:3
      },
       {
        idMenu:6,
        idEquipment:3
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
