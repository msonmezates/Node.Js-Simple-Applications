const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  let HTML = fs.readFileSync(`${__dirname}/index.html`)
  res.end(HTML);
});

server.listen(8181, 'localhost');
console.log('Server is running');
console.log(__dirname);
