import User from "./User.js";
import Role from "./Role.js";

import Category from "./Category.js";
import Ticket from "./Ticket.js";
import Comment from "./Comment.js";

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

Ticket.hasMany(Comment, {
  foreignKey: "ticketId",
  as: "comments",
});

Comment.belongsTo(Ticket, {
  foreignKey: "ticketId",
  as: "ticket",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "userId",
  as: "comments",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

export { User, Role, Category, Ticket, Comment };
