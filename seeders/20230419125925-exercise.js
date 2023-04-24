'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Exercises", [
      {
        name: "Full body workout",
        info: "",
        calories: 400,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaKOCBoSDpf2ibE6wJbeZQOPNS9E-Q1jTgEA&usqp=CAU",
        level: 1,
        points: 0,
      },
      {
        name: "Upper body workout",
        info: "",
        calories: 300,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaKOCBoSDpf2ibE6wJbeZQOPNS9E-Q1jTgEA&usqp=CAU",
        level: 2,points: 0,
      },
      {
        name: "Lower body workout",
        info: "",
        calories: 300,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaKOCBoSDpf2ibE6wJbeZQOPNS9E-Q1jTgEA&usqp=CAU",
        level: 3,points: 0,
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
