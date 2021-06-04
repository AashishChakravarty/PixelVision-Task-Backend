const router = require('express').Router();
const { verifyToken } = require('../helpers/security');

module.exports = function () {
  router.use('/users', require('./users.routes')());

  router.use('/calender', validateUser, require('./calender.routes')());

  function validateUser(req, res, next) {
    const authorization = req.headers['authorization']

    verifyToken(authorization ? authorization.split(" ")[1] : '').then(decoded => {
      req.userData = decoded;
      next();
    }).catch(err => {
      res.status(401).json({
        status: false,
        message: err.message,
      });
    })
  }

  return router;
};
