import User from "./User.js";
import Role from "./Role.js";

import Category from "./Category.js";
import Ticket from "./Ticket.js";

Role.hasMany(User, {
  foreignKey: "roleId",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

User.hasMany(Ticket, {
  foreignKey: "userId",
  as: "tickets",
});

Ticket.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

Category.hasMany(Ticket, {
  foreignKey: "categoryId",
  as: "tickets",
});

Ticket.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

User.hasMany(Ticket, {
  foreignKey: "assignedToId",
  as: "assignedTickets",
});

Ticket.belongsTo(User, {
  foreignKey: "assignedToId",
  as: "assignedTechnician",
  onUpdate: "CASCADE",
  onDelete: "SET NULL",
});

export { User, Role, Category, Ticket };
