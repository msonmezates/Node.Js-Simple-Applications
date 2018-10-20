const {User} = require('../models/user');

const auth = (req, res, next) => {
  console.log(req.cookies.auth);
  const token = req.cookies.auth;

  User.findByToken(token, (err, user) => {
    if(err) throw err;
    req.user = user;
    next();
  });
};

module.exports = { auth };