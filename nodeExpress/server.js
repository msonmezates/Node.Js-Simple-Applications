const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');

const urlencodeParser = bodyParser.urlencoded({extended: false})

// ####### MIDDLEWARE ########
app.use("/css", express.static(`${__dirname}/public/css/`));
app.use('/', (req,res,next) => {
  console.log(`Someone made a request from ${req.url}`);
  res.cookie('cookieName', 'cookieValue');
  next();
});

// ######### GET ########
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <head>
          <link type="text/css" rel="stylesheet" href="/css/style.css"/>
        </head>
        <h1>My Node App</h1>
      </body>
    </html>
  `);
});

app.get("/api/user", (req, res) => {
  res.send({
    firstName: "Mehmet", lastName: "Sonmezates"
  });
});

app.get("/enteruser", (req, res) => {
  res.render('enteruser')
});

// POST
app.post("/enteruser", urlencodeParser, (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  console.log(firstname, lastname);
});

// ####### RENDER FROM TABLE ######
app.get("/user", (req, res) => {
  res.render('user', {
    title: 'User profile',
    name: 'Francis',
    lastname: 'Jones',
    valid: true,
    pets: ['dog', 'cat', 'fish'],
    parents: [
      { dad:'Mario', mother:'Martha' }
    ]
  });
});

/// Usage of PARAMS

app.get("/api/:user/:id", (req, res) => {
  let id = req.params.id;
  let username = req.params.user;
  res.send(`
    <html>
      <body>
        <h3>The user id is ${id}</h3>
        <h4>The username is ${username}</h4>
      </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, err => {
  if(err) console.log('Err: ' + err);;
});
