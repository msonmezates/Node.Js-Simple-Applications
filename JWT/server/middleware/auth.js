const {User} = require('../models/user');

const auth = (req, res, next) => {
  const token = req.header('x-token');

  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.status(400).send();
    req.token = token; // add token to the request to use it later
    req.user = user; // add user to the request to use it later
    next();
  });
}

module.exports = { auth };