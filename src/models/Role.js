const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    permissions: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "[]",
      get() {
        const raw = this.getDataValue("permissions");
        try {
          return typeof raw === "string" ? JSON.parse(raw) : raw;
        } catch (err) {
          return [];
        }
      },
      set(value) {
        this.setDataValue("permissions", JSON.stringify(value || []));
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Role;
