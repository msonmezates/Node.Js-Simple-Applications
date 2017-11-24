const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hey there, this is a server response')
});

server.listen(8181, 'localhost');
console.log('Server is running');
