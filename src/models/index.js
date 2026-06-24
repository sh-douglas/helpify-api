import User from "./User.js";
import Role from "./Role.js";

import Category from "./Category.js";

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

export { User, Role, Category };
