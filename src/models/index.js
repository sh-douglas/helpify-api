import User from "./User.js";
import Role from "./Role.js";

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

export { User, Role };
