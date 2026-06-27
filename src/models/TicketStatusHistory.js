import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TicketStatusHistory = sequelize.define(
  "TicketStatusHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ticketId: {
      type: DataTypes.INTEGER,
      references: {
        model: "tickets",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    changedById: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    oldStatus: {
      type: DataTypes.ENUM(
        "OPEN",
        "IN_PROGRESS",
        "WAITING_USER",
        "RESOLVED",
        "CLOSED",
      ),
      allowNull: false,
    },
    newStatus: {
      type: DataTypes.ENUM(
        "OPEN",
        "IN_PROGRESS",
        "WAITING_USER",
        "RESOLVED",
        "CLOSED",
      ),
      allowNull: false,
    },
  },
  { tableName: "ticket_status_histories" },
);

export default TicketStatusHistory;
