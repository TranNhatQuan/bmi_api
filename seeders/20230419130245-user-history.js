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
      {
        idUser: 3,
        date: "2023-05-01",
        weight: 50,
        height: 170,
        calories_in: 2000,
        calories_out: 500,
        water: 2000
    },
    {
        idUser: 3,
        date: "2023-05-02",
        weight: 51,
        height: 170,
        calories_in: 2100,
        calories_out: 600,
        water: 2100
    },
    {
        idUser: 3,
        date: "2023-05-03",
        weight: 52,
        height: 170,
        calories_in: 2200,
        calories_out: 700,
        water: 2200
    },
    {
        idUser: 3,
        date: "2023-05-04",
        weight: 53,
        height: 170,
        calories_in: 2300,
        calories_out: 800,
        water: 2300
    },
    {
        idUser: 3,
        date: "2023-05-05",
        weight: 54,
        height: 170,
        calories_in: 2400,
        calories_out: 900,
        water: 2400
    },
    {
        idUser: 3,
        date: "2023-05-09",
        weight: 55,
        height: 170,
        calories_in: 2500,
        calories_out:1000 ,
        water:2500 
    },
    {
      idUser: 3,
      date: "2023-05-10",
      weight: 55,
      height: 170,
      calories_in: 2500,
      calories_out:1000 ,
      water:2500 
    },
    {
      idUser: 3,
      date: "2023-05-11",
      weight: 55,
      height: 170,
      calories_in: 2500,
      calories_out:1000 ,
      water:2500 
    },{
      idUser: 3,
      date: "2023-05-12",
      weight: 55,
      height: 170,
      calories_in: 2500,
      calories_out:1000 ,
      water:2500 
    },{
      idUser: 3,
      date: "2023-05-13",
      weight: 55,
      height: 170,
      calories_in: 2500,
      calories_out:1000 ,
      water:2500 
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
