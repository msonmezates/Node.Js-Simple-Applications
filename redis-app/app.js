const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const redis = require('redis');
const app = express();

// Create client
const client = redis.createClient();

client.on('connect', () => console.log('Redis server connected'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  let title = 'Task List';

  client.lrange('tasks', 0, -1, (err, reply) => {
    res.render('index', {
       title,
       tasks: reply 
      });
  });
});

app.listen(5000, () => console.log('server started on port 5000'));

module.exports = app;
