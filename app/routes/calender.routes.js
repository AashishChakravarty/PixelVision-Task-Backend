const router = require('express').Router();

module.exports = function () {
  const calender = require('../controllers/calender');

  router.get('/day', calender.day);

  return router;
};
