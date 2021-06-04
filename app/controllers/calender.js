// const jwt = require('jsonwebtoken');
// const users = require('../models/users');
// const security = require('../helpers/security');

const day = async (req, res) => {
  const date = req.query.date;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date(date);
  const dayName = days[d.getDay()];
  res.json({
    status: true,
    message: 'Successfully Login',
    data: {
      day: dayName
    }
  });
};

// const login = async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   users
//     .findOne({ email })
//     .then((user) => {
//       if (user) {
//         const isValidUser = security.comparePasswords(password, user.password);
//         if (isValidUser) {
//           // After successful login
//           // STEP 1: Generate JWT token.
//           let userPayload = {
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             iat: new Date().getTime()
//           };
//           let token = security.generateToken(userPayload);
//           users
//             .findByIdAndUpdate(
//               { _id: user._id },
//               { token }
//             )
//             .then((result) => {
//               const data = {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 token
//               }
//               res.json({
//                 status: true,
//                 message: 'Successfully Login',
//                 data
//               });
//             })
//             .catch((err) => {
//               next(err);
//             });
//         } else {
//           res.status(401).send({
//             message: 'Invalid Email and Password',
//             status: false,
//           });
//         }
//       } else {
//         res.status(401).send({
//           message: 'Invalid Email and Password',
//           status: false,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Something went to wrong please try again',
//         status: false,
//       });
//     });
// };

module.exports = { day }
