const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })

  const names = ['Tony', 'Brad', 'Alice'];
  const cars = {
    name: 'Ford',
    model: 'Fiesta'
  };

  let json = JSON.stringify({
    names, cars
  });

  res.end(json);
});

server.listen(8181, 'localhost');
console.log('Server is running');
