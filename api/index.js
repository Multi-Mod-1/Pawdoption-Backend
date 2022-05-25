/* eslint-disable max-len */
const router = require('express').Router();
module.exports = router;

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

// These already begin the routes so in dog and user files you don't need to begin with /users for example
router.use('/users', require('./users'));
router.use('/dogs', require('./dogs'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
