"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const nowDate = new Date();

    await queryInterface.bulkInsert("roles", [
      {
        name: "ADMIN",
        createdAt: nowDate,
        updatedAt: nowDate,
      },
      {
        name: "TECHNICIAN",
        createdAt: nowDate,
        updatedAt: nowDate,
      },
      {
        name: "USER",
        createdAt: nowDate,
        updatedAt: nowDate,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", {
      name: {
        [Sequelize.Op.in]: ["ADMIN", "TECHNICIAN", "USER"],
      },
    });
  },
};
