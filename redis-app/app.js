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
    client.hgetall('call', (err, call) => {
      res.render('index', {
        title,
        tasks: reply ,
        call
       });
    });
  });
});

app.post('/task/add', (req, res) => {
  let task = req.body.task;

  client.rpush('tasks', task, (err, reply) => {
    if (err) console.log(err);
    console.log('Task Added');
    res.redirect('/');
  })
});

app.post('/task/delete', (req, res) => {
  let tasksToDlete = req.body.tasks;

  client.lrange('tasks', 0, -1, (err, tasks) => {
    tasks.map(task => {
      if (tasksToDlete.indexOf(task) > -1) {
        client.lrem('tasks', 0, task, () => {
          if (err) console.log(err)
        });
      }
    });
    res.redirect('/');
  });
});

app.post('/call/add', (req, res) => {
  const { name, company, phone, time } = req.body;
  const newCall = { name, company, phone, time };

  client.hmset('call', ['name', newCall.name, 'company', newCall.company, 'phone', newCall.phone, 'time', newCall.time], (err, reply) => {
    if(err) console.log('Error', err);
    console.log(reply);
    res.redirect('/');
  });
});

app.listen(5000, () => console.log('server started on port 5000'));

module.exports = app;
