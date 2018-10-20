const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
    unique: 1, // making sure there can't be any duplicated name
    maxlength: 20,
    trim: true
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: 1,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  role: {
    type: Number,
    default: 2 // 1 is for main user
  },
  token: {
    type: String,
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if(user.isModified('password')) {
    bcrypt.genSalt(SALT_I, function(err, salt) {
      if(err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.generateToken = function(cb) {
  const user = this;
  let token = jwt.sign(user._id.toHexString(), config.SECRET);
  user.token = token;
  user.save((err, user) => {
    if(err) return cb(err);
    cb(null, user);
  });
}

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

userSchema.statics.findByToken = function(token, cb) {
  const user = this;
  jwt.verify(token, config.SECRET, (err, decode) => {
    user.findOne({'_id': decode, 'token': token}, (err,user) => {
      if(err) return cb(err);
      cb(null, user);
    });
  });
}

const User = mongoose.model('User', userSchema);

module.exports = { User };