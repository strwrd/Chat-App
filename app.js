// Node API
const path = require('path');
const http = require('http');

// Third Party Module
const express = require('express');
const socketIO = require('socket.io');

// Local Modules
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { Users } = require('./utils/user');
const { isRealString } = require('./utils/validation');

// Init Chat-App
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;
const users = new Users();

// Setting up for public path
const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

// Event Listener
io.on('connection', (socket) => {
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room required!');
    }

    const room = params.room.toLowerCase();

    socket.join(room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, room);

    io.to(room).emit('updateUserList', users.getUserList(room));

    socket.emit('newMessage', generateMessage('Admin', `Hey ${params.name}, Welcome to the Chat App and enjoy your chat!`));

    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${params.name} join the room!`));
    return callback();
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left room.`));
    }
  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      callback();
    }
  });

  socket.on('createLocationMessage', (coord, callback) => {
    const user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coord.lat, coord.long));
      callback();
    }
  });
});

// Listen and binding Port
server.listen(port, () => {
  console.log(`Chat-App is starting at port ${port} `);
});

