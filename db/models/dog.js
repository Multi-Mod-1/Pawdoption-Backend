const {Sequelize, DataTypes, Model} = require("sequelize");
const {db} = require("../db");

class Dog extends Model {
  /* methods... */
}

Dog.init(
  {
    name: DataTypes.STRING,
    sex: DataTypes.STRING, ///*
    age: DataTypes.NUMBER,
    breed: DataTypes.STRING, ///*
    location: DataTypes.STRING, ///*
    summary: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  },
  {
    sequelize: db,
    timestamps: false,
  },
);

//* make these an enum? a seperate table?
// for simplicity sake.. they are not for now.

module.exports = Dog;