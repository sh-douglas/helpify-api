import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Ticket = sequelize.define(
  "Ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "OPEN",
        "IN_PROGRESS",
        "WAITING_USER",
        "RESOLVED",
        "CLOSED",
      ),
      defaultValue: "OPEN",
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH", "CRITICAL"),
      defaultValue: "MEDIUM",
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  { tableName: "tickets" },
);

export default Ticket;
