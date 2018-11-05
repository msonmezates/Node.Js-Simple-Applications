const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/../public'));

io.on('connection', (socket) => {
  console.log('socket io is connected');

  // Emit a custom event to the socket
  socket.emit('newMessage', {
    from: 'John Doe',
    message: 'Test message'
  });

  // Listen to a custom event
  socket.on('sendMessage', (message) => {
    console.log(`Message received from client: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from server');
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server listening on port ${port}`));