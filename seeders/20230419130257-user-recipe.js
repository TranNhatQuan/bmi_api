'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("User_recipes", [
      {
        idUser:2,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      
      {
        idUser:3,
        idRecipe:1,
        cmt: 'like',
        date: '2023-04-24 12:59:59',
        isLike:0,
      },
      {
        idUser: 3,
        idRecipe: 2,
        cmt: "love",
        date: "2023-05-17 09:34:44",
        isLike: 1
      },
      {
        idUser: 3,
        idRecipe: 3,
        cmt: "dislike",
        date: "2023-05-28 12:12:55",
        isLike: 0
      },
      {
        idUser: 3,
        idRecipe: 4,
        cmt: "neutral",
        date: "2023-05-08 19:06:51",
        isLike: 1
      },
      {
        idUser: 3,
        idRecipe: 5,
        cmt: "like",
        date: "2023-05-03 14:45:11",
        isLike: 0
      },
      {
        idUser: 3,
        idRecipe: 6,
        cmt: "hate",
        date: "2023-05-29 23:59:59",
        isLike: 1
      },
      {
        idUser: 3,
        idRecipe: 7,
        cmt: "love",
        date: "2023-05-15 08:30:22",
        isLike: 0
      },
      {
        idUser:4,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:5,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:6,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:7,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:8,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:9,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:10,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:11,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:12,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:13,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:14,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:1,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:15,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:16,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:17,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:18,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:19,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
      },
      {
        idUser:20,
        idRecipe:1,
        cmt: 'Naisu',
        date: '2023-04-24 12:59:59',
        isLike: 1,
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
