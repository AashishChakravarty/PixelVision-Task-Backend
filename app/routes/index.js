const router = require('express').Router();
const jwt = require('jsonwebtoken');

module.exports = function () {
  router.use('/users', require('./users.routes')());

  router.use('/calender', require('./calender.routes')());

  function validateUser(req, res, next) {
    const secretKey = process.env.JWT_SECRET_KEY;
    jwt.verify(
      req.headers['authorization'],
      secretKey,
      function (err, decoded) {
        if (err) {
          res.status(401).json({
            status: false,
            message: err.message,
          });
        } else {
          req.userData = decoded;
          next();
        }
      }
    );
  }

  return router;
};
