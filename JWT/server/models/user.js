const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_ITERATION = 10

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  }
})

// we need to hash password before we save it
userSchema.pre('save', function(next) { // here pre means do it before save
  let user = this
  // we should only run this function when user adds or changes password
  if(user.isModified('password')) {
    bcrypt.genSalt(SALT_ITERATION, function(err, salt) {
      if(err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) return next(err)
        user.password = hash
        next()
      }) 
    })
  } else {
    next() // if password isn't modified, go to the next line
  }
})

// reusable code for comparing passwords
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if(err) return callback(err)
    callback(null, isMatch)
  })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }