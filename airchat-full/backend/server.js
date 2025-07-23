const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {};

app.use(express.static(path.join(__dirname, '../frontend')));

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('join-room', ({ username, room, password }) => {
    socket.join(room);
    if (!users[room]) users[room] = [];
    users[room].push({ id: socket.id, username, isHost: users[room].length === 0 });

    io.to(room).emit('room-users', users[room]);
  });

  socket.on('disconnect', () => {
    for (const room in users) {
      users[room] = users[room].filter(u => u.id !== socket.id);
      io.to(room).emit('room-users', users[room]);
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
