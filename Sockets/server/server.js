const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/../public'));

io.on('connection', (socket) => {
  console.log('socket io is connected');

  socket.on('join', (data) => {
    console.log(data);

    socket.join(`room-${data.room}`);

    socket.broadcast.to(`room-${data.room}`).emit('userJoined', `${data.user} joined the room.`);
  });

  // // Listen to a custom event
  // socket.on('sendMessage', (newMessage, cb) => {
  //   console.log(`Message received from client: ${newMessage}`);

  //   // Emit a custom event to all sockets
  //   socket.broadcast.emit('newMessage', {
  //     from: 'John Doe',
  //     message: 'Test message'
  //   });

  //   cb();
  // });

  socket.on('disconnect', () => {
    console.log('User disconnected from server');
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server listening on port ${port}`));