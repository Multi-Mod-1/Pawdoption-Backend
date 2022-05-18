/* eslint-disable max-len */
const router = require('express').Router();
module.exports = router;

// These already begin the routes so in dog and user files you don't need to begin with /users for example
router.use('/users', require('./users'));
router.use('/dogs', require('./dogs'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
