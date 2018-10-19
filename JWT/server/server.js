const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {User} = require('./models/user');
const {auth} = require('./middleware/auth');
const config = require('./config/config').get(process.env.NODE_ENV); //heroku returns production by default

const app = express();
app.use(bodyParser.json());

// DB
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, { useNewUrlParser: true });

// POST
app.post('/api/user', (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  user.save((err, doc) => {
    if(err) return res.status(400).send(err);
    
    user.generateToken((err, user) => {
      if(err) return res.status(400).send(err);
      return res.header('x-token', user.token).send(user);
    });
  });
});

app.post('/api/user/login', (req, res) => {
  const {email, password} = req.body;
  User.findOne({'email': email}, (err, user) => {
    if(!user) return res.json({ message: 'Auth failed. User not found' });

    user.comparePassword(password, function(err, isMatch) {
      if(err) throw err;
      if(!isMatch) return res.json({ message: "Wrong password!" });
      
      user.generateToken((err, user) => {
        return res.header('x-token', user.token).send(user); // x-token is custom header
      });
    });
  });
});

// GET
app.get('/user/profile', auth, (req, res) => {
  res.status(200).send(req.token); // req.token comes from middleware
});

// Logout route
app.delete('/user/logout', auth, (req, res) => { // we can use get,post,delete for logout
  req.user.deleteToken(req.token, (err, user) => {
    if(err) res.status(400).send(err);
    res.status(200).send('User is logged out');
  });
});


app.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}`));