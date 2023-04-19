'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Menus", [
      {
        name: 'Leg',
        image: 'https://cdn.shopify.com/s/files/1/0538/8307/6805/products/Rubber-Hex-Dumbbell-L_1_1800x1800_78ea050c-4f5a-4e8a-bdae-a664272eac80_1800x1800.jpg?v=1619710214',
        video: 'https://www.youtube.com/watch?v=NH4V_Q99tbQ',
        index: 1,
        time: 20,
        idSet: 1,
      },
      {
        name: 'Arm',
        image: 'https://cdn.shopify.com/s/files/1/0538/8307/6805/products/Rubber-Hex-Dumbbell-L_1_1800x1800_78ea050c-4f5a-4e8a-bdae-a664272eac80_1800x1800.jpg?v=1619710214',
        video: 'https://www.youtube.com/watch?v=NH4V_Q99tbQ',
        index: 2,
        time: 20,
        idSet: 1,
      },
      {
        name: 'Calf raise',
        image: 'https://cdn.shopify.com/s/files/1/0538/8307/6805/products/Rubber-Hex-Dumbbell-L_1_1800x1800_78ea050c-4f5a-4e8a-bdae-a664272eac80_1800x1800.jpg?v=1619710214',
        video: 'https://www.youtube.com/watch?v=NH4V_Q99tbQ',
        index: 3,
        time: 20,
        idSet: 1,
      },
      {
        name: 'Leg',
        image: 'https://cdn.shopify.com/s/files/1/0538/8307/6805/products/Rubber-Hex-Dumbbell-L_1_1800x1800_78ea050c-4f5a-4e8a-bdae-a664272eac80_1800x1800.jpg?v=1619710214',
        video: 'https://www.youtube.com/watch?v=NH4V_Q99tbQ',
        index: 1,
        time: 20,
        idSet: 2,
      },
      {
        name: 'Arm',
        image: 'https://cdn.shopify.com/s/files/1/0538/8307/6805/products/Rubber-Hex-Dumbbell-L_1_1800x1800_78ea050c-4f5a-4e8a-bdae-a664272eac80_1800x1800.jpg?v=1619710214',
        video: 'https://www.youtube.com/watch?v=NH4V_Q99tbQ',
        index: 2,
        time: 20,
        idSet: 2,
      },
      {
        name: 'Calf raise',
        image: 'https://cdn.shopify.com/s/files/1/0538/8307/6805/products/Rubber-Hex-Dumbbell-L_1_1800x1800_78ea050c-4f5a-4e8a-bdae-a664272eac80_1800x1800.jpg?v=1619710214',
        video: 'https://www.youtube.com/watch?v=NH4V_Q99tbQ',
        index: 3,
        time: 20,
        idSet: 2,
      },
      {
        name: 'Leg',
        image: 'https://cdn.shopify.com/s/files/1/0538/8307/6805/products/Rubber-Hex-Dumbbell-L_1_1800x1800_78ea050c-4f5a-4e8a-bdae-a664272eac80_1800x1800.jpg?v=1619710214',
        video: 'https://www.youtube.com/watch?v=NH4V_Q99tbQ',
        index: 1,
        time: 20,
        idSet: 4,
      },
      {
        name: 'Leg',
        image: 'https://cdn.shopify.com/s/files/1/0538/8307/6805/products/Rubber-Hex-Dumbbell-L_1_1800x1800_78ea050c-4f5a-4e8a-bdae-a664272eac80_1800x1800.jpg?v=1619710214',
        video: 'https://www.youtube.com/watch?v=NH4V_Q99tbQ',
        index: 2,
        time: 20,
        idSet: 4,
      },
      {
        name: 'Leg',
        image: 'https://cdn.shopify.com/s/files/1/0538/8307/6805/products/Rubber-Hex-Dumbbell-L_1_1800x1800_78ea050c-4f5a-4e8a-bdae-a664272eac80_1800x1800.jpg?v=1619710214',
        video: 'https://www.youtube.com/watch?v=NH4V_Q99tbQ',
        index: 3,
        time: 20,
        idSet: 4,
      },
      {
        name: 'Leg',
        image: 'https://cdn.shopify.com/s/files/1/0538/8307/6805/products/Rubber-Hex-Dumbbell-L_1_1800x1800_78ea050c-4f5a-4e8a-bdae-a664272eac80_1800x1800.jpg?v=1619710214',
        video: 'https://www.youtube.com/watch?v=NH4V_Q99tbQ',
        index: 1,
        time: 20,
        idSet: 5,
      },
      {
        name: 'Leg',
        image: 'https://cdn.shopify.com/s/files/1/0538/8307/6805/products/Rubber-Hex-Dumbbell-L_1_1800x1800_78ea050c-4f5a-4e8a-bdae-a664272eac80_1800x1800.jpg?v=1619710214',
        video: 'https://www.youtube.com/watch?v=NH4V_Q99tbQ',
        index: 2,
        time: 20,
        idSet: 5,
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
