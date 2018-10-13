const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {User} = require('./models/user')

const app = express()
app.use(bodyParser.json())

// DB
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:23456/auth', { useNewUrlParser: true })

// POST
app.post('/api/user', (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  })

  user.save((err, doc) => {
    if(err) res.status(400).send(err)
    res.status(200).send(doc)
  })
})

app.post('/api/user/login', (req, res) => {
  const {email, password} = req.body
  User.findOne({'email': email}, (err, user) => {
    if(!user) res.json({ message: 'Auth failed. User not found' })

    user.comparePassword(password, function(err, isMatch) {
      if(err) throw err;
      if(!isMatch) return res.json({ message: "Wrong password!" })
      res.status(200).send(isMatch)
    })
  })
})


let port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))