'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: 'TranNhatQuan',
        gender: 1,
        weight: 50,
        height:169,
        idAcc: 1,
        isShare: 1,
        //admin Quan
      },
      {
        name: 'Tran Nhat Quan',
        gender: 0,
        weight: 50,
        height:169,
        idAcc: 2,
        isShare: 1,
      },
      {
        name: 'Le Mau Anh Duc',
        gender: 1,
        weight: 50,
        height:169,
        idAcc: 3,
        isShare: 1,
      },
      {
        name: 'Nguyen Duc Thinh',
        gender: 0,
        idAcc: 4,
        weight: 50,
        height:169,
        isShare: 0,
      },
      {
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 5,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 6,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 7,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 8,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 9,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 10,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 11,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 12,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 13,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 14,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 15,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 16,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 17,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 18,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 19,
        weight: 50,
        height:169,
        isShare: 1,
      },{
        name: 'Ta Minh Tri',
        gender: 0,
        idAcc: 20,
        weight: 50,
        height:169,
        isShare: 1,
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
