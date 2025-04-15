const sequelize = require("../config/database");
const User = require("./User");
const Work = require("./Work");
const Role = require("./Role");

// Define relationships
User.hasMany(Work, { foreignKey: "userId" });
Work.belongsTo(User, { foreignKey: "userId" });

Role.hasMany(User, { foreignKey: "roleId", as: "users" });
// User.belongsTo(Role, { foreignKey: "roleId", as: "role" });

module.exports = { sequelize, User, Work, Role };
