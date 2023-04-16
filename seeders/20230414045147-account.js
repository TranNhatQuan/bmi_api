

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
  
    return queryInterface.bulkInsert("Accounts", [
      {
        mail: "trannhatquan.2001@gmail.com",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        forgot: 0,
        role: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {

  },
};