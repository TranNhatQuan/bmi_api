'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Recipes", [
      {
        name: 'Crispy fried chicken',
        info: '',
        calories: 300,
        proteins: 20,
        fats: 30,
        carbo: 10,
        idType: 1,
        image: 'https://cdn.tgdd.vn/2020/08/CookRecipe/Avatar/uc-ga-chien-gion-thumbnail.jpg',
      },
      {
        name: 'Boiled Eggs',
        info: '',
        calories: 200,
        proteins: 40,
        fats: 30,
        carbo: 10,
        idType: 2,
        image: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQkn_6Y0-g8lFMQ2asrd3VTy4SOeDei_LEMXDxUTPsz5FjOJTuNn-uqmh33IwtTkGs90cfLOGkaTdgnT_1xEno',
      },
      {
        name: 'Boiled Chicken',
        info: '',
        calories: 400,
        proteins: 40,
        fats: 30,
        carbo: 10,
        idType: 2,
        image: 'https://cdn.tgdd.vn/2021/01/CookProduct/cach-lam-ga-cung4-960x540.jpg',
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
