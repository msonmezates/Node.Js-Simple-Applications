const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const app = express()

/// HBS SETUP
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}))
app.set('view engine', 'hbs')

/// CSS SETUP
app.use('/css', express.static(`${__dirname}/public/css`))

/// MIDDLEWARE SETUP
const jsonParser = bodyParser.json()

/// ROUTES
// GET
app.get('/', (req,res) => {
  fetch('http://localhost:3004/messages')
    .then(response => {
      response.json().then(json => {
        res.render('home', {
          articles: json
        })
      })
    }).catch(err => console.log(err))
})

app.get('/add_note', (req,res) => {
  res.render('add_note')
})

app.get('/edit_note/:id', (req, res) => {
  const {id} = req.params;
  fetch(`http://localhost:3004/messages/${id}`)
    .then(response => {
      response.json().then(json => {
        res.render('edit_note', {
          articles: json
        })
      })
    })
})
//POST
app.post('/api/add_note', jsonParser, (req,res) => {
  fetch('http://localhost:3004/messages', {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    res.status(200).send()
  })
})

//PATCH
app.patch('/api/edit_note/:id', jsonParser, (req, res) => {
  const id = req.params.id;
  fetch(`http://localhost:3004/messages/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    res.status(200).send()
  })
})

//DELETE
app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;
  fetch(`http://localhost:3004/messages/${id}`, {
    method: 'DELETE'
  }).then(response => {
    res.status(200).send()
  }).catch(err => console.log(err))
})

// SERVER SETUP
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server is running on port 4000'))