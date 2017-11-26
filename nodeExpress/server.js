const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
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

const port = process.env.PORT || 3000;
app.listen(port, err => {
  if(err) console.log('Err: ' + err);;
});
