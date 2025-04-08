const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Work = sequelize.define("Work", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  workName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      "In Progress",
      "Pending Approval",
      "Approved",
      "Completed"
    ),
    allowNull: false,
  },
  sanctionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

Work.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Work, { foreignKey: "userId" });

module.exports = Work;
