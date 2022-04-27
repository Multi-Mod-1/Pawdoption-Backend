const express = require("express");
const router = express.Router();

const cors = require("cors");
const bcrypt = require("bcrypt");

// These get imported from the index.js file in the models folder
const {} = require("../db/models");
module.exports = router;

// Routes go here, but they begin with router instead of app
// e.g. router.get, router.post etc
// also the routes in this file already begins with users
// e.g. router.get("/") == router.get("/users")
// write it like this ^

// To test is http://www.localhost:3000/api/users
router.get("/", (req, res, next) => {
  res.send("Getting all users");
});
