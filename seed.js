const path = require("path");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

//access to our model and database
const {db} = require("./db");
const {User} = require("./db/models");

//define our seed function
const seed = async () => {
  //clear out our table
  await db.sync({force: true});

  //find the path to our json file
  const seedPath = path.join(__dirname, "./json/user.json");

  const buffer = await fs.readFile(seedPath);
  const {users} = JSON.parse(String(buffer));

  //will create each row for our User and Show Table
  const userPromises = users.map((user) => User.create(user));

  await Promise.all(userPromises);

  console.log("user data has been successfully populated into our table");
};

seed();
//export this seed function
module.exports = seed;
