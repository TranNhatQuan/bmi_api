'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Equipment", [
      {
        name:'Jump Rope',
        image:'https://salt.tikicdn.com/cache/750x750/ts/product/c5/81/58/c358fd7e9a544244816b730e43d407c0.jpg.webp'
      },
      {
        name: 'Dumbbell',
        image: 'https://cdn.shopify.com/s/files/1/0538/8307/6805/products/Rubber-Hex-Dumbbell-L_1_1800x1800_78ea050c-4f5a-4e8a-bdae-a664272eac80_1800x1800.jpg?v=1619710214'
      },
       {
        name: 'Barbell',
        image: 'https://gymaster.vn/wp-content/uploads/2022/06/unnamed__12.png'
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
