const {Sequelize, DataTypes, Model} = require("sequelize");
const {db} = require("../db");

class User extends Model {}

User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    location: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
  },
  {
    sequelize: db,
    timestamps: false,
  },
);

module.exports = User;
