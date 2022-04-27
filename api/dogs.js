const express = require("express");
const router = express.Router();

const cors = require("cors");
const bcrypt = require("bcrypt");

// These get imported from the index.js file in the models folder
const {} = require("../db/models");
module.exports = router;

// Routes go here, but they begin with router instead of app
// e.g. router.get, router.post etc
// also the routes in this file already begins with dogs
// e.g. router.get("/") == router.get("/dogs")
// write it like this ^
