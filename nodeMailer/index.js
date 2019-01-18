const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const app = express();

app.get('/', (req, res) => {
  res.send('hello there');
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));