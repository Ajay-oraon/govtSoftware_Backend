const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Role = sequelize.define("Role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  roleName: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING, allowNull: true },
  permissions: { type: DataTypes.JSON, allowNull: false },
  status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    defaultValue: "Active",
  },
});

module.exports = Role;
