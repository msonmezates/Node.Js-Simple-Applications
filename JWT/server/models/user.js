const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT_ITERATION = 10;


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  token: {
    type: String
  }
});

// we need to hash password before we save it
userSchema.pre('save', function(next) { // here pre means do it before save
  const user = this;
  // we should only run this function when user adds or changes password
  if(user.isModified('password')) {
    bcrypt.genSalt(SALT_ITERATION, function(err, salt) {
      if(err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next(); // if password isn't modified, go to the next line
  }
})

// reusable code for comparing passwords
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if(err) return callback(err);
    callback(null, isMatch);
  });
}

userSchema.methods.generateToken = function(callback) {
  const user = this;
  let token = jwt.sign(user._id.toHexString(), config.SECRET);

  user.token = token;
  user.save((err, user) => {
    if(err) return callback(err);
    callback(null, user);
  })
}

userSchema.statics.findByToken = function(token, callback) {
  const user = this;

  jwt.verify(token, config.SECRET, (err, decode) => {
    user.findOne({'_id': decode, 'token': token}, (err, user) => {
      if(err) return callback(err);
      callback(null, user);
    });
  });
}

userSchema.methods.deleteToken = function(token, callback) {
  const user = this;

  user.update({  // $unset: {token:1} means remove token from user...using token:0 or token:1 does the same thing
    $unset: { 
      token: 1
    }  
  }, (err, user) => {
    if(err) return callback(err);
    callback(null, user);
  });
}

const User = mongoose.model('User', userSchema);

module.exports = { User };