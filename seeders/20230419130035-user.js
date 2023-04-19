'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: 'TranNhatQuan',
        gender: 1,
        idAcc: 1,
        isShare: 1,
        //admin Quan
      },
      {
        name: 'Tran Nhat Quan',
        gender: 0,
        idAcc: 2,
        isShare: 1,
      },
      {
        name: 'Le Mau Anh Duc',
        gender: 1,
        idAcc: 3,
        isShare: 1,
      },
      {
        name: 'Nguyen Duc Thinh',
        gender: 0,
        idAcc: 4,
        isShare: 0,
      },
      {
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 4,
        isShare: 1,
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
