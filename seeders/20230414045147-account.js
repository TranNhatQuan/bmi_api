

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
  
    return queryInterface.bulkInsert("Accounts", [
      {
        mail: "trannhatquan.2001@gmail.com",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        forgot: 0,
        role: 1,
        //admin
      },
      {
        mail: "n19dccn153@student.ptithcm.edu.vn",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        forgot: 0,
        role: 0,
        //user Quan
      },
      {
        mail: "n19dccn038@student.ptithcm.edu.vn",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        forgot: 0,
        role: 0,
        //user Duck
      },
      {
        mail: "n19dccn196@student.ptithcm.edu.vn",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        forgot: 0,
        role: 0,
        //user Thinh
      },
      {
        mail: "n19dccn210@student.ptithcm.edu.vn",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        forgot: 0,
        role: 0,
        //user Tri
      },
    ]);
  },

  async down(queryInterface, Sequelize) {

  },
};