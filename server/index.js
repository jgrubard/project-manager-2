require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
// let userSocket = {};

// console.log(userSocket);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`** PORT ${port} **`));

let io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('made socket connection', socket.id);
  // socket.on('user-online', userId => {
  //   userSocket[userId] = socket;
  // })

  socket.on('join-project', (projectId, userId) => {
      if(projectId) {
        const room = `project-room-${projectId}`;
        socket.join(room);
        console.log(socket.rooms);
        const allClients = io.sockets.adapter.rooms[room].sockets;
        console.log('all clients:', allClients);
        const userCount = Object.keys(allClients).length;
        const usersLogged = userCount > 1 ? ' users' : ' user';
        console.log(userCount + usersLogged + ' in ' + room);
      }
  });

  socket.on('leave-project', (projectId, userId) => {
    if(projectId) {
      const room = `project-room-${projectId}`;
      socket.leave(room);
      console.log('user', socket.id, 'left', room);
      console.log(socket.rooms);
      // if(socket.rooms[room]) {
      //   const allClients = io.sockets.adapter.rooms[room].sockets;
      //   console.log('all clients:', allClients);
      //   const userCount = Object.keys(allClients).length;
      //   const usersLogged = userCount > 1 ? ' users' : ' user';
      //   console.log(userCount + usersLogged + ' in ' + room);
      // } else {
      //   console.log('no more users, room disregarded');
      // }
    }
});

  socket.on('project-created', project => {
    socket.broadcast.emit('project-created', project);
    // socket.to(`project-room-${project.id}`).emit('project-created', project);
  });

  socket.on('project-deleted', projectId => {
    socket.broadcast.emit('project-deleted', projectId);
  });

  socket.on('task-created', task => {
    // socket.broadcast.emit('task-created', task);
    socket.broadcast.to(`project-room-${task.projectId}`).emit('task-created', task);
  });

  socket.on('task-updated', task => {
    // socket.broadcast.emit('task-updated', task);
    socket.broadcast.to(`project-room-${task.projectId}`).emit('task-updated', task);
  });

  socket.on('task-deleted', task => {
    socket.broadcast.to(`project-room-${task.projectId}`).emit('task-created', task);
    // socket.broadcast.emit('task-deleted', task);
  })

  socket.on('disconnect', () => console.log('client disconnected'))
});

app.use(require('body-parser').json());

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/public', express.static(path.join(__dirname, '../client/public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/api', require('./routes'));

db.conn.sync();

// module.exports = { userSocket }; 








// require('dotenv').config();
// const { app, express, io } = require('./socket');
// const db = require('./db');
// const path = require('path');

// app.use(require('body-parser').json());

// app.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../client/public/index.html'));
// });

// app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
// app.use('/public', express.static(path.join(__dirname, '../client/public')));
// app.use('/dist', express.static(path.join(__dirname, '../dist')));
// app.use('/api', require('./routes'));

// db.conn.sync();