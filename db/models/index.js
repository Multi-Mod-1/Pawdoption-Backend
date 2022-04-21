const User = require("./user");
const Dog = require("./dog");
const Location = require("./location");

// Relationships here

//Ex.
// Dog.belongsTo(Location);
// Location.hasMany(Dog);

module.exports = {
  User,
  Dog,
  Location,
};
