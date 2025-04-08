const User = require("./User");
const Work = require("./Work");
const Role = require("./Role");

// Define relationships
User.hasMany(Work, { foreignKey: "userId" });
Work.belongsTo(User, { foreignKey: "userId" });

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

module.exports = { User, Work, Role };
