const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Book} = require('./models/books');
const {Store} = require('./models/stores');
const app = express();

app.use(express.static(__dirname + '/../public')) // we need ../public to go to the root folder and then html
app.use(bodyParser.json())

// Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:23456/book_db', { useNewUrlParser: true });

// POST request
app.post('/api/add/store', (req,res) => {
  const {name,address,phone} = req.body;
  
  const store = new Store({
    name,
    address,
    phone
  });

  store.save((err, doc) => {
    if(err) res.status(400).send(err)
    res.status(200).send()
  })
})

app.post('/api/add/books', (req,res) => {
  const {name,author,pages,price,stores} = req.body;

  const book = new Book({
    name,
    author,
    pages,
    price,
    stores
  })

  book.save((err,doc) => {
    if(err) res.status(400).send(err)
    res.status(200).send()
  })
})

// GET request
app.get('/api/stores', (req,res) => {
  Store.find((err,doc) => {
    if(err) res.status(400).send(err)
    res.send(doc)
  })
})

app.get('/api/books', (req,res) => {

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let order = req.query.sort ? req.query.sort : 'asc'

  Book.find().sort({_id: order}).limit(limit).exec((err,doc) => {
    if(err) res.status(400).send(err);
    res.send(doc)
  })
})

app.get('/api/books/:id', (req,res) => {
  bookId = req.params.id;

  Book.findById(bookId, (err,doc) => {
    if(err) res.status(400).send(err)
    res.send(doc)
  })
})

// PATCH request
app.patch('/api/add/books/:id', (req,res) => {
  const bookId = req.params.id;

  Book.findByIdAndUpdate(bookId, {
    $set:req.body // this will let us update everything on page
  }, {
    new: true // we want to get the new updated data
  }, (err, doc) => {
    if(err) res.status(400).send(err)
    res.send(doc)
  })
})

// DELETE request
app.delete('/api/delete/books/:id', (req, res) => {
  let bookId = req.params.id;

  Book.findByIdAndDelete(bookId, (err,doc) => {
    if(err) res.status(400).send(err)
    res.status(200).send()
  })
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started at port ${port}`))