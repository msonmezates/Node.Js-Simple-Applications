const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const config = require('./config/config').get(process.env.NODE_ENV); //by default heroku assigns this to production
const {auth} = require('./middleware/auth');
// MODELS
const {User} = require('./models/user');
const {Article} = require('./models/article');
const {UserReview} = require('./models/user_reviews');

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
  Article.find().sort({_id: 'asc'}).limit(10).exec((err, doc) => { // ascending order by mongoose id, limit articles upto 10
    if(err) return res.status(400).send(err);
    res.render('home', {
      articles: doc
    });
  });
});

app.get('/register', auth, (req, res) => {
  if(req.user) return res.redirect('/dashboard');
  res.render('register');
});

app.get('/login', auth, (req, res) => {
  if(req.user) return res.redirect('/dashboard');
  res.render('login');
});

app.get('/games/:id', auth, (req, res) => {
  let addReview = req.user ? true : false;
  Article.findById(req.params.id, (err, article) => {
    if(err) res.status(400).send(err);

    UserReview.find({'postId': req.params.id}).limit(10).exec((err, UserReviews) => {
      if(err) res.status(400).send(err);
      res.render('article', {
        date: moment(article.createdAt).format('MM/DD/YYYY'),
        article,
        review: addReview,
        UserReviews
      });
    });
  });
});

app.get('/dashboard',auth, (req, res) => {
  if(!req.user) return res.redirect('/login');
  res.render('dashboard', {
    dashboard: true,
    isAdmin: req.user.role === 1 ? true : false
  });
});

app.get('/dashboard/articles', auth, (req, res) => {
  if(!req.user) return res.redirect('/login');
  res.render('admin_articles', {
    dashboard: true,
    isAdmin: req.user.role === 1 ? true : false
  });
});

app.get('/dashboard/reviews', auth, (req, res) => {
  if(!req.user) return res.redirect('/login');
  UserReview.find({'ownerId': req.user._id}).exec((err, userReviews) => {
    res.render('admin_reviews', {
      dashboard: true,
      isAdmin: req.user.role === 1 ? true : false,
      userReviews
    });
  });
});

app.get('/dashboard/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if(err) return res.status(400).send(err);
    res.redirect('/');
  });
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

app.post('/api/add_article', auth, (req, res) => {
  const article = new Article({
    ownerUsername: req.user.username,
    ownerId: req.user._id,
    title: req.body.title,
    review: req.body.review,
    rating: req.body.rating
  });

  article.save((err, article) => {
    if(err) return res.status(400).send(err);
    res.status(200).send();
  });
});

app.post('/api/user_review', auth, (req, res) => {
  const userReview = new UserReview({
    postId: req.body.id,
    ownerUsername: req.user.username, //this comes from auth middleware
    ownerId: req.user._id,
    titlePost: req.body.titlePost,
    review: req.body.review,
    rating: req.body.rating
  });

  userReview.save((err, doc) => {
    if(err) res.status(400).send(err);
    res.status(200).send();
  });
});

app.listen(config.PORT, () => console.log(`Server started on port ${config.PORT}`));
