const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const config = require('./config/config').get(process.env.NODE_ENV); //by default heroku assigns this to production
const {User} = require('./models/user');
const {auth} = require('./middleware/auth');

const app = express();

// HBS SETUP
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/../views/layouts',
  partialsDir: __dirname + '/../views/partials' 
}));
app.set('view engine', 'hbs');

// DB SETUP
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {useNewUrlParser: true});

// Middleware
app.use('/css', express.static(__dirname + '/../public/css'));
app.use('/js', express.static(__dirname + '/../public/js'));
app.use(bodyParser.json());
app.use(cookieParser());

// GET Route
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/register', auth, (req, res) => {
  if(req.user) return res.redirect('/dashboard');
  res.render('register');
});

app.get('/login', auth, (req, res) => {
  if(req.user) return res.redirect('/dashboard');
  res.render('login');
});

// POST Route
app.post('/api/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if(err) return res.status(400).send(err);
    user.generateToken((err, user) => {
      if(err) res.status(400).send(err);
      res.cookie('auth', user.token).send('ok');
    });
  }); 
});

app.post('/api/login', (req, res) => {
  const {email, password} = req.body;
  User.findOne({ 'email': email }, (err, user) => {
    if(!user) return res.status(400).json({ message: 'Wrong email!' });
    user.comparePassword(password, (err, isMatch) => {
      if(err)  throw err;
      if(!isMatch) return res.status(400).json({ message: 'Wrong password!' });

      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        res.cookie('auth', user.token).send('ok');
      });
    }); 
  });
});

app.listen(config.PORT, () => console.log(`Server started on port ${config.PORT}`));
