"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ticket_status_histories", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ticketId: {
        type: Sequelize.INTEGER,
        references: {
          model: "tickets",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      changedById: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      oldStatus: {
        type: Sequelize.ENUM(
          "OPEN",
          "IN_PROGRESS",
          "WAITING_USER",
          "RESOLVED",
          "CLOSED",
        ),
        allowNull: false,
      },
      newStatus: {
        type: Sequelize.ENUM(
          "OPEN",
          "IN_PROGRESS",
          "WAITING_USER",
          "RESOLVED",
          "CLOSED",
        ),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ticket_status_histories");
  },
};
