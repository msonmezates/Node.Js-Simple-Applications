const express = require('express');

const app = express();

app.use("/css", express.static(`${__dirname}/public/css/`));

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
